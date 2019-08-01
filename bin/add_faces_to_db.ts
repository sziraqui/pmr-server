#!/usr/bin/env ts-node
import { ArgumentParser } from 'argparse';
import { readdir } from 'fs';
import path from 'path';
import { readImage } from 'nodoface';
import { Facenet, FaceDetectorMTCNN, FaceDetector, utils } from '../../pmr-core/src/index';
import { db } from '../';
import { Tensor3D } from '@tensorflow/tfjs-node';

let parser = new ArgumentParser();
parser.addArgument('dataPath', { help: 'dataset directory' });

let args = parser.parseArgs();

async function run(dataPath: string) {
    readdir(dataPath, (err, dirs) => {
        if (err) throw err;
        dirs.forEach((subdir, i) => {
            // handle face dir
            handleFaceDir(path.join(dataPath, subdir));
        });
    });
}

async function handleFaceDir(dir: string) {
    readdir(dir, (err, files) => {
        if (err) console.log(`Err:${err.message}`);
        files.forEach(async (file, i) => {
            // add face to db
            let img = readImage(path.join(dir, file));
            let mtcnn = await FaceDetector.getInstance({ detector: 'mtcnn' });
            let facenet = await Facenet.getInstance();
            let faceBlobs = await mtcnn.detect(img);
            faceBlobs.forEach(async (faceBlob) => {
                faceBlob.descriptor = await facenet.embedding(faceBlob.faceImage);
                console.log(faceBlob.descriptor.length);
                let personName = path.basename(dir).replace('_', ' ');
                let dbh = new db.DbHelper();
                dbh.insertFace(Array.from(faceBlob.descriptor), personName);
                // process.exit(0);
            });
        });
    });
}
console.log(args);
run(path.resolve(args.dataPath));