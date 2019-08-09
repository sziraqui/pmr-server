import { Request, Response } from "express";
import * as amzn from '../amzn-dtypes';
import * as nf from 'nodoface';
import { FaceDetector } from "../../../pmr-core/src";
import { DetectFacesResponse } from "../amzn-dtypes";

/**
 * @see 
 */
export class DetectFaces {
    imageBlob: string;
    attrs: amzn.DetectFacesRequestAttribute[];
    constructor(private req: Request, private res: Response) {
        this.imageBlob = req.body.Bytes;
        this.attrs = req.body.Attributes;
    }

    async run() {
        const image = nf.Image.fromBase64(this.imageBlob);
        const detector = await FaceDetector.getInstance();
        let faceBlobs = await detector.detect(image);
        let facedetails = [];
        faceBlobs.forEach((faceBlob) => {
            facedetails.push(new amzn.FaceDetail(amzn.BoundingBox.fromRect(faceBlob.bbox, image.width(), image.height()), null, null, null, null, null, null, null, null, null, null, null, null, null, faceBlob.confidence * 100));
        });
        let result = new DetectFacesResponse(facedetails);
        return result;
    }
}