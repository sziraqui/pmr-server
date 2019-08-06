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
parser.addArgument(['--minExamples', '-m'], { help: 'minimum examples per class', type: parseInt, required: false, defaultValue: 1 });
parser.addArgument(['--numExamples', '-n'], { help: 'number of examples per class', type: parseInt, required: false, defaultValue: 100 });
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
            console.log(`Processing ${i + 1}/${dirs.length}: ${subdir}`);
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
        if (files.length >= args.minExamples) {
            files.slice(0, args.numExamples).forEach(async (file) => {
                // add face to db
                try {
                    let img = readImage(path.join(dir, file));
                    let faceBlobs = await mtcnn.detect(img);
                    for (let i = 0; i < Math.min(1, faceBlobs.length); i++) {
                        faceBlobs[0].descriptor = await facenet.embedding(faceBlobs[0].faceImage);
                        let personName = path.basename(dir).replace('_', ' ');
                        let res = await dbh.insertFace(Array.from(faceBlobs[0].descriptor), personName);
                        res['update_dataset_status'] = await dbh.updateDatasetInfo(args.dataset.toUpperCase(), args.variant.toUpperCase(), path.join(path.basename(dir), file), res['face_id']);
                        console.log(`Done: ${file}`);
                    }
                } catch (error) {
                    return Promise.reject(error);
                }
            });
        }
    });
}

run(path.resolve(args.dataPath))
    .catch(err => console.log(err));