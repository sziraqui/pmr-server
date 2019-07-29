import * as amzn from '../';
/**
 * @see https://docs.aws.amazon.com/rekognition/latest/dg/API_FaceRecord.html
 */
export class FaceRecord {
    /**
     * 
     * @param Face 
     * @param FaceDetail 
     */
    constructor(
        public Face: amzn.Face = new amzn.Face(),
        public FaceDetail: amzn.FaceDetail = new amzn.FaceDetail()
    ) { }
}
