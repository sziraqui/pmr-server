import { Request, Response } from "express";
import * as amzn from '../amzn-dtypes';
import * as nf from 'nodoface';
import { FaceDetector, FaceBlob, randomColor, FaceClassifier, Facenet } from "../../../pmr-core/src";
import { BoundingBox } from "../amzn-dtypes";
import { constants } from '../..';
import * as path from 'path';
import { DbHelper } from "../dbclient";
const ENV = require(constants.configFile).environment;
const config = require(constants.configFile)[ENV];
import * as _ from 'lodash';
import { Job } from "../dbclient/DbHelper";
import download from 'download';
import * as fs from 'fs';
import uuidv4 = require("uuidv4");
import * as pmr from "../pmr-dtypes";

export class CelebrityInVideo {
    videoUrl: string;
    videoFile: string;
    dbHelper: DbHelper;
    job: Job;
    minRecogConfidence: 0.4;
    annotedFrames: Array<pmr.AnnotatedFrame>;
    result: pmr.CelebrityInVideoResponse;

    constructor(private req: Request, private res: Response) {
        this.videoUrl = req.body.Video.Url;
        this.dbHelper = new DbHelper();
    }

    async run() {
        try {
            await this.dispatch();
            this.prepare().then(async () => {
                await this.process();
                await this.makeResult();
            });
            return _.merge({}, this.result, this.job);
        } catch (error) {
            this.dbHelper.updateJobStatus(this.job.JobId, 'FAILED', this.job.ResultUrl);
            return Promise.reject(error);
        }
    }

    async dispatch() {
        this.job = await this.dbHelper.createNewJob();
        let resultUrl = `${config.host}:${config.port}/api/v0/jobs/${this.job.JobId}`;
        this.job.ResultUrl = resultUrl;
        return this.job;
    }

    async prepare() {
        this.videoFile = uuidv4();
        await this.dbHelper.updateJobStatus(this.job.JobId, 'DOWNLOADING', this.job.ResultUrl);
        try {
            await download(this.videoUrl)
                .then(data => fs.writeFileSync(path.join(constants.videoDir, this.videoFile), data));
        } catch (error) {
            await this.dbHelper.updateJobStatus(this.job.JobId, 'DOWNLOAD_FAILED', this.job.ResultUrl);
        }
        this.videoFile = path.join(constants.videoDir, this.videoFile);
    }

    async process() {
        this.job = await this.dbHelper.updateJobStatus(this.job.JobId, 'PROCESSING', this.job.ResultUrl);
        let [detector, facenet, classifier] = await Promise.all([
            FaceDetector.getInstance(),
            Facenet.getInstance(),
            FaceClassifier.getInstance()]);
        let videoStream = new nf.SequenceCapture();
        videoStream.openVideoFile(this.videoFile);
        this.annotedFrames = new Array<pmr.AnnotatedFrame>();
        for (let i = 0; videoStream.getProgress() < 1; i++) {
            let frame = videoStream.getNextFrame();
            await this.processFrame(frame, detector, facenet, classifier);
            this.job = await this.dbHelper.updateJobStatus(this.job.JobId, `PROCESSING_${(videoStream.getProgress() * 100).toFixed(0)}%`, this.job.ResultUrl);
        }
    }

    async processFrame(image: nf.Image, detector: FaceDetector, facenet: Facenet, classifier: FaceClassifier) {
        let faceBlobs = await detector.detect(image);
        let classifierResults = new Array(faceBlobs.length);
        for (let i = 0; i < faceBlobs.length; i++) {
            faceBlobs[i].descriptor = await facenet.embedding(faceBlobs[i].faceImage);
            let result = await classifier.predict(Float64Array.from(faceBlobs[i].descriptor));
            faceBlobs[i].name = result.label;
            classifierResults[i] = result;
        }
        this.annotateFrame(image, faceBlobs, classifierResults);
        await this.drawFrame(image, faceBlobs, classifierResults);
        return faceBlobs;
    }

    annotateFrame(image: nf.Image, faceBlobs: FaceBlob[], classifierResults: Array<any>) {
        let celebrities = new Array<amzn.Celebrity>();
        let unrecognised = new Array<amzn.ComparedFace>();
        for (let i = 0; i < faceBlobs.length; i++) {
            let faceBlob = faceBlobs[i];
            let comparedFace = new amzn.ComparedFace(
                BoundingBox.fromRect(faceBlob.bbox, image.width(), image.height()),
                faceBlob.confidence * 100
            );
            if (classifierResults[i].confidences[faceBlob.name] > this.minRecogConfidence) {
                celebrities.push(
                    new amzn.Celebrity(
                        faceBlob.name,
                        comparedFace,
                        classifierResults[i].classIndex,
                        classifierResults[i].confidences[faceBlob.name] * 100
                    )
                );
            } else {
                unrecognised.push(comparedFace);
            }
        }
        let partialRes = new pmr.AnnotatedFrame(celebrities, unrecognised)
        this.annotedFrames.push(partialRes);
        return { faceBlobs, classifierResults };
    }

    async drawFrame(image: nf.Image, faceBlobs: FaceBlob[], classifierResults: Array<any>) {
        let detections = [];
        let texts = [];
        let colors = [];
        for (let i = 0; i < faceBlobs.length; i++) {
            let faceBlob = faceBlobs[i];
            let label = '';
            let recogConf = classifierResults[i].confidences[faceBlob.name];
            if (recogConf > this.minRecogConfidence) {
                label = `${i}|${faceBlob.name}, ${(recogConf * 100).toFixed(2)}`;
            } else {
                label = `${i}|Unknown`;
                label += `|Face, ${(faceBlob.confidence * 100).toFixed(2)}`;
            }
            detections.push(faceBlob.bbox);
            texts.push(label);
            colors.push(randomColor());
        }
        nf.drawDetections(image, detections, texts, colors, 0.8);
        let resultPath = path.join(constants.videoDir, this.job.JobId + '_' + this.annotedFrames.length + '.jpg');
        nf.saveImage(resultPath, image);
    }

    async makeResult() {
        this.result = new pmr.CelebrityInVideoResponse(this.annotedFrames, []);
        this.job = await this.dbHelper.updateJobResult(this.job.JobId, 'COMPLETED', this.result);
    }

}