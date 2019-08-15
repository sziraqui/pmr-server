import { Request, Response } from "express";
import * as amzn from '../amzn-dtypes';
import * as nf from 'nodoface';
import { FaceDetector, FaceBlob, randomColor } from "../../../pmr-core/src";
import { DetectFacesResponse } from "../amzn-dtypes";
import { constants } from '../../';
import * as path from 'path';
import { DbHelper } from "../dbclient";
const ENV = require(constants.configFile).environment;
const config = require(constants.configFile)[ENV];
import * as _ from 'lodash';
import { Job } from "../dbclient/DbHelper";

/**
 * @see 
 */
export class DetectFaces {
    imageBlob: string;
    attrs: amzn.DetectFacesRequestAttribute[];
    dbHelper: DbHelper;
    faceBlobs: FaceBlob[];
    job: Job;
    image: nf.Image;
    result: DetectFacesResponse;

    constructor(private req: Request, private res: Response) {
        this.imageBlob = req.body.Image.Bytes;
        this.attrs = req.body.Attributes;
        this.dbHelper = new DbHelper();
    }

    async dispatch() {
        this.job = await this.dbHelper.createNewJob();
        let resultUrl = `${config.host}:${config.port}/api/v0/jobs/${this.job.JobId}`;
        this.job.ResultUrl = resultUrl;
        return this.job;
    }

    async run() {
        try {
            await this.dispatch();
            this.process().then(async (r) => {
                await this.makeResult();
                await this.drawJob();
            });
            return _.merge({}, this.result, this.job);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    async process() {
        this.image = nf.Image.fromBase64(this.imageBlob);
        let detector = await FaceDetector.getInstance();
        this.faceBlobs = await detector.detect(this.image);
        return this.faceBlobs;
    }

    async drawJob() {
        let detections = [];
        let texts = [];
        let colors = [];
        for (let i = 0; i < this.faceBlobs.length; i++) {
            let faceBlob = this.faceBlobs[i];
            let label = `${i}|Face, ${(faceBlob.confidence * 100).toFixed(2)}`;
            detections.push(faceBlob.bbox);
            texts.push(label);
            colors.push(randomColor());
        }
        nf.drawDetections(this.image, detections, texts, colors, 0.8);
        let resultPath = path.join(constants.jobOutputDir, this.job.JobId + '.jpg');
        nf.saveImage(resultPath, this.image);
        this.job.ResultUrl = `${config.host}:${config.port}/downloads/jobs/${this.job.JobId}.jpg`;
        this.job.Status = 'COMPLETED';
        await this.dbHelper.updateJobStatus(this.job.JobId, this.job.Status, this.job.ResultUrl);
        return await this.job.ResultUrl;
    }

    makeResult() {
        let facedetails = [];
        this.faceBlobs.forEach((faceBlob) => {
            facedetails.push(new amzn.FaceDetail(
                amzn.BoundingBox.fromRect(faceBlob.bbox, this.image.width(), this.image.height()),
                null, null, null, null, null, null, null, null, null, null, null, null, null,
                faceBlob.confidence * 100));
        });
        this.result = new DetectFacesResponse(facedetails);
        this.dbHelper.updateJobResult(this.job.JobId, 'DRAWING', this.result);
        return this.result;
    }
}