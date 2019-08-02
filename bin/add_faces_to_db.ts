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
let faceModelParams = new FaceModelParameters([__dirname]);
let mtcnn: FaceDetector, facenet: Facenet, dbh: DbHelper;
let args = parser.parseArgs();

async function run(dataPath: string) {
    mtcnn = await FaceDetector.getInstance({ detector: 'mtcnn', weightsPath: faceModelParams.getMtcnnLocation() });
    facenet = await Facenet.getInstance();
    dbh = new db.DbHelper();
    readdir(dataPath, async (err, dirs) => {
        if (err) throw err;
        dirs.forEach(async (subdir, i) => {
            // handle face dir
            console.log(`Processing ${i} of ${dirs.length}`);
            await handleFaceDir(path.join(dataPath, subdir));
        });
    });
}

async function handleFaceDir(dir: string) {
    readdir(dir, async (err, files) => {
        if (err) console.log(`Err:${err.message}`);
        files.forEach(async (file) => {
            // add face to db
            let img = readImage(path.join(dir, file));
            let faceBlobs = await mtcnn.detect(img);
            faceBlobs.forEach(async (faceBlob) => {
                faceBlob.descriptor = await facenet.embedding(faceBlob.faceImage);
                let personName = path.basename(dir).replace('_', ' ');
                await dbh.insertFace(Array.from(faceBlob.descriptor), personName);
            });
        });
    });
}

console.log(args);
run(path.resolve(args.dataPath));