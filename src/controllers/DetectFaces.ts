import { Request, Response } from "express";
import * as amzn from '../amzn-dtypes';
import * as nf from 'nodoface';
import { FaceDetector, FaceBlob, randomColor } from "../../../pmr-core/src";
import { DetectFacesResponse } from "../amzn-dtypes";
import { constants } from '../../';
import * as path from 'path';
import { DbHelper } from "../dbclient";
const ENV = require(constants.configDir).environment;
const config = require('../config/default.json')[ENV]
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
        const jobStatus = await this.dbHelper.createNewJob();
        const image = nf.Image.fromBase64(this.imageBlob);
        const detector = await FaceDetector.getInstance();
        let faceBlobs = await detector.detect(image);
        this.drawJob(faceBlobs, image, jobStatus['JobId']).catch(console.log);
        let facedetails = [];
        faceBlobs.forEach((faceBlob) => {
            facedetails.push(new amzn.FaceDetail(amzn.BoundingBox.fromRect(faceBlob.bbox, image.width(), image.height()), null, null, null, null, null, null, null, null, null, null, null, null, null, faceBlob.confidence * 100));
        });
        let result = new DetectFacesResponse(facedetails);
        result['JobStatus'] = jobStatus;
        return result;
    }

    async drawJob(faceBlobs: FaceBlob[], image: nf.Image, jobId: string) {
        faceBlobs.forEach((faceBlob, i) => {
            const color = randomColor() as [number, number, number];
            nf.drawRect(image, faceBlob.bbox, color);
            nf.drawText(image, `Face ${i}, ${(faceBlob.confidence * 100).toFixed(2)}`, { x: faceBlob.bbox.x - 2, y: faceBlob.bbox.y - 2 }, color);
        });
        let resultPath = path.join(constants.jobOutputDir, jobId + '.jpg');
        nf.saveImage(resultPath, image);
        let resultUrl = `${config.host}:${config.port}/${resultPath}`;
        return await this.dbHelper.updateJobStatus(jobId, 'COMPLETED', resultUrl);
    }
}