import * as amzn from '../';
/**
 * @see https://docs.aws.amazon.com/rekognition/latest/dg/API_FaceDetection.html
 */
export class FaceDetection {
    constructor(
        /**
         * 
         */
        public Face: amzn.FaceDetail = new amzn.FaceDetail(),
        public Timestamp: number = 0
    ) { }
}
