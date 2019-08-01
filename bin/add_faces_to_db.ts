#!/usr/bin/env ts-node
import { ArgumentParser } from 'argparse';
import { readdir, readdirSync } from 'fs';
import path from 'path';
import { readImage, showImage, waitKey } from 'nodoface';
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
    let dirs = readdirSync(dataPath);
    for (let subdir of dirs) {
        console.log(subdir);
        await handleFaceDir(path.join(dataPath, subdir));
    }
}

async function handleFaceDir(dir: string) {
    let files = readdirSync(dir);
    for (let file of files) {
        // add face to db
        let img = readImage(path.join(dir, file));
        let faceBlobs = await mtcnn.detect(img);
        console.log('Detected faces', faceBlobs.length);
        for (let faceBlob of faceBlobs) {
            faceBlob.descriptor = await facenet.embedding(faceBlob.faceImage);
            let personName = path.basename(dir).replace('_', ' ');
            console.log(file)
            showImage(img.extract(faceBlob.bbox), file);
            waitKey(0);
            let res = await dbh.insertFace(Array.from(faceBlob.descriptor), personName);
            console.log('inserted', personName);
        }
    }
}

console.log(args);
run(path.resolve(args.dataPath));