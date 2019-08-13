import { Request, Response } from "express";
import * as amzn from '../amzn-dtypes';
import * as nf from 'nodoface';
import { FaceDetector, FaceBlob, randomColor } from "../../../pmr-core/src";
import { DetectFacesResponse, Face, Image } from "../amzn-dtypes";
import { constants } from '../..';
import * as path from 'path';
import { DbHelper } from "../dbclient";
const ENV = require(constants.configFile).environment;
const config = require(constants.configFile)[ENV];
import * as _ from 'lodash';
import { Job } from "../dbclient/DbHelper";

/**
 * @see 
 */
export class RecognizeCelebrities {
    imageBlob: string;
    dbHelper: DbHelper;
    faceBlobs: FaceBlob[];
    job: Job;
    image: nf.Image;
    result: Object;
    constructor(private req: Request, private res: Response) {
        this.imageBlob = req.body.Image.Bytes;
        this.dbHelper = new DbHelper();
    }

    async run() {
        try {
            await this.dispatch();
            await this.process();
            await this.drawJob();
            await this.makeResult();
            return this.result;
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
        const detector = await FaceDetector.getInstance();
        this.faceBlobs = await detector.detect(this.image);
        return this.faceBlobs;
    }

    async drawJob() {
        let detections = [];
        let texts = [];
        let colors = [];
        this.faceBlobs.forEach((faceBlob, i) => {
            detections.push(faceBlob.bbox);
            texts.push(`Face ${i}, ${(faceBlob.confidence * 100).toFixed(2)}`);
            colors.push(randomColor());
        });
        nf.drawDetections(this.image, detections, texts, colors, 1);
        let resultPath = path.join(constants.jobOutputDir, this.job.JobId + '.jpg');
        nf.saveImage(resultPath, this.image);
        this.job.ResultUrl = `${config.host}:${config.port}/downloads/jobs/${this.job.JobId}.jpg`;
        return await this.job.ResultUrl;
    }

    makeResult() {
        let facedetails = [];
        this.faceBlobs.forEach((faceBlob) => {
            facedetails.push(
                new amzn.FaceDetail(
                    amzn.BoundingBox.fromRect(faceBlob.bbox, this.image.width(), this.image.height()),
                    null, null, null, null, null, null, null, null, null, null, null, null, null,
                    faceBlob.confidence * 100
                )
            );
        });
        this.result = new DetectFacesResponse(facedetails);
        this.result = _.merge({}, this.result, this.job);
        return this.result;
    }
}