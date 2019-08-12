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

/**
 * @see 
 */
export class DetectFaces {
    imageBlob: string;
    attrs: amzn.DetectFacesRequestAttribute[];
    dbHelper: DbHelper;

    constructor(private req: Request, private res: Response) {
        this.imageBlob = req.body.Bytes;
        this.attrs = req.body.Attributes;
        this.dbHelper = new DbHelper();
    }

    async run() {
        let jobStatus = await this.dbHelper.createNewJob();
        let resultUrl = `${config.host}:${config.port}/api/v0/jobs/${jobStatus['JobId']}`;
        jobStatus['ResultUrl'] = resultUrl;
        const image = nf.Image.fromBase64(this.imageBlob);
        const detector = await FaceDetector.getInstance();
        let faceBlobs = await detector.detect(image);
        this.drawJob(faceBlobs, image, jobStatus['JobId']).then(resultUrl => this.dbHelper.updateJobStatus(jobStatus['JobId'], 'COMPLETED', resultUrl)).then(console.log);
        let facedetails = [];
        await faceBlobs.forEach((faceBlob) => {
            facedetails.push(new amzn.FaceDetail(amzn.BoundingBox.fromRect(faceBlob.bbox, image.width(), image.height()), null, null, null, null, null, null, null, null, null, null, null, null, null, faceBlob.confidence * 100));
        });
        let result = new DetectFacesResponse(facedetails);
        result['JobStatus'] = jobStatus;
        return result;
    }

    async drawJob(faceBlobs: FaceBlob[], image: nf.Image, jobId: string) {
        let detections = [];
        let texts = [];
        let colors = [];
        faceBlobs.forEach((faceBlob, i) => {
            detections.push(faceBlob.bbox);
            texts.push(`Face ${i}, ${(faceBlob.confidence * 100).toFixed(2)}`);
            colors.push(randomColor());
        });
        nf.drawDetections(image, detections, texts, colors, 0.8);
        let resultPath = path.join(constants.jobOutputDir, jobId + '.jpg');
        nf.saveImage(resultPath, image);
        let resultUrl = `${config.host}:${config.port}/downloads/jobs/${jobId}.jpg`;
        return await resultUrl;
    }
}