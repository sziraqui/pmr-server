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
import { RecognizeCelebritiesResponse } from "../amzn-dtypes/response-types/RecognizeCelebritiesResponse";

/**
 * @see 
 */
export class RecognizeCelebrities {
    minRecogConfidence = 0.5;
    imageBlob: string;
    dbHelper: DbHelper;
    faceBlobs: FaceBlob[];
    job: Job;
    image: nf.Image;
    result: RecognizeCelebritiesResponse;
    classifierResults: Array<any>;
    constructor(private req: Request, private res: Response) {
        this.imageBlob = req.body.Image.Bytes;
        this.dbHelper = new DbHelper();
    }

    async run() {
        try {
            await this.dispatch();
            await this.process();
            await this.makeResult();
            await this.drawJob();
            return _.merge({}, this.result, this.job);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    async dispatch() {
        this.job = await this.dbHelper.createNewJob();
        let resultUrl = `${config.host}:${config.port}/api/v0/jobs/${this.job.JobId}`;
        this.job.ResultUrl = resultUrl;
        return this.job;
    }


    async process() {
        this.image = nf.Image.fromBase64(this.imageBlob);

        let [detector, facenet, classifier] = await Promise.all([
            FaceDetector.getInstance(),
            Facenet.getInstance(),
            FaceClassifier.getInstance()]);

        this.faceBlobs = await detector.detect(this.image);
        this.classifierResults = new Array(this.faceBlobs.length);
        for (let i = 0; i < this.faceBlobs.length; i++) {
            this.faceBlobs[i].descriptor = await facenet.embedding(this.faceBlobs[i].faceImage);
            let result = await classifier.predict(Float64Array.from(this.faceBlobs[i].descriptor));
            this.faceBlobs[i].name = result.label;
            this.classifierResults.push(result);
        }
        return this.faceBlobs;
    }

    async drawJob() {
        let detections = [];
        let texts = [];
        let colors = [];
        this.faceBlobs.forEach((faceBlob, i) => {
            let label = '';
            let recogConf = this.classifierResults[i].confidences[faceBlob.name];
            if (recogConf > this.minRecogConfidence) {
                label = `${i}|${faceBlob.name}, ${(recogConf * 100).toFixed(2)}`;
            } else {
                label = `${i}|Unknown`;
            }
            label += `\nFace, ${(faceBlob.confidence).toFixed(2)}`;
            detections.push(faceBlob.bbox);
            texts.push(label);
            colors.push(randomColor());
        });
        nf.drawDetections(this.image, detections, texts, colors, 0.8);
        let resultPath = path.join(constants.jobOutputDir, this.job.JobId + '.jpg');
        nf.saveImage(resultPath, this.image);
        this.job.ResultUrl = `${config.host}:${config.port}/downloads/jobs/${this.job.JobId}.jpg`;
        this.job.Status = 'COMPLETED';
        this.dbHelper.updateJobStatus(this.job.JobId, this.job.Status, this.job.ResultUrl);
        return await this.job.ResultUrl;
    }

    makeResult() {
        let celebrities = new Array<amzn.Celebrity>();
        let unrecognised = new Array<amzn.ComparedFace>();
        this.faceBlobs.forEach((faceBlob, i) => {
            let comparedFace = new amzn.ComparedFace(
                BoundingBox.fromRect(faceBlob.bbox, this.image.width(), this.image.height()),
                faceBlob.confidence
            );
            if (this.classifierResults[i].confidences[faceBlob.name] > this.minRecogConfidence) {
                celebrities.push(
                    new amzn.Celebrity(
                        faceBlob.name,
                        comparedFace,
                        this.classifierResults[i].classIndex,
                        this.classifierResults[i].confidence[faceBlob.name]
                    )
                );
            } else {
                unrecognised.push(comparedFace);
            }
        });
        this.result = new RecognizeCelebritiesResponse(celebrities, unrecognised, null);
        this.dbHelper.updateJobResult(this.job.JobId, 'DRAWING', this.result);
        return this.result;
    }
}