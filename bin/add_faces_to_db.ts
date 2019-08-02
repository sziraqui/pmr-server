#!/usr/bin/env ts-node
import { ArgumentParser } from 'argparse';
import { readdir } from 'fs';
import path from 'path';
import { readImage } from 'nodoface';
import { Facenet, FaceDetector, FaceModelParameters } from '../../pmr-core/src/index';
import { db } from '../';
import { DbHelper } from '../src/dbclient';

let parser = new ArgumentParser();
parser.addArgument('dataPath', { help: 'dataset directory' });
parser.addArgument('dataset', { help: 'name of dataset eg. lfw' });
parser.addArgument('variant', { help: 'dataset variant eg. "deepfunneled" for lfw-deepfunneled', defaultValue: 'main', required: false });
let args = parser.parseArgs();

let faceModelParams = new FaceModelParameters([__dirname]);
let mtcnn: FaceDetector, facenet: Facenet, dbh: DbHelper;

async function run(dataPath: string) {
    try {
        mtcnn = await FaceDetector.getInstance({ detector: 'mtcnn', weightsPath: faceModelParams.getMtcnnLocation() });
        facenet = await Facenet.getInstance();
        dbh = new db.DbHelper();
    } catch (err) {
        return Promise.reject(err.message);
    }
    readdir(dataPath, async (err, dirs) => {
        if (err) throw err;
        dirs.forEach(async (subdir, i) => {
            // handle face dir
            console.log(`Processing ${i} of ${dirs.length}`);
            try {
                await handleFaceDir(path.join(dataPath, subdir));
            } catch (error) {
                return Promise.reject(error);
            }
        });
    });
}

async function handleFaceDir(dir: string) {
    readdir(dir, async (err, files) => {
        if (err) console.log(`Err:${err.message}`);
        files.forEach(async (file) => {
            // add face to db
            try {
                let img = readImage(path.join(dir, file));
                let faceBlobs = await mtcnn.detect(img);
                faceBlobs.forEach(async (faceBlob) => {
                    try {
                        faceBlob.descriptor = await facenet.embedding(faceBlob.faceImage);
                        let personName = path.basename(dir).replace('_', ' ');
                        let res = await dbh.insertFace(Array.from(faceBlob.descriptor), personName);
                        res['update_dataset_status'] = await dbh.updateDatasetInfo(args.dataset.toUpperCase(), args.variant.toUpperCase(), path.join(path.basename(dir), file), res['face_id']);
                        return res;
                    } catch (err1) {
                        return Promise.reject(err.message);
                    }
                });
            } catch (error) {
                return Promise.reject(error);
            }
        });
    });
}

run(path.resolve(args.dataPath))
    .catch(err => console.log(err));