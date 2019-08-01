import * as amzn from '../';
import uuidv4 from 'uuidv4';
/**
 * @see https://docs.aws.amazon.com/rekognition/latest/dg/API_CelebrityDetail.html
 */
export class CelebrityDetail {
    /**
     * 
     * @param Name 
     * @param BoundingBox bbox of body of the celebrity
     * @param Face 
     * @param Id 
     * @param Confidence confidence of recognition
     * @param Urls 
     */
    constructor(
        public Name: string = 'celebrity_name',
        public BoundingBox: amzn.BoundingBox = new amzn.BoundingBox(),
        public Face: amzn.FaceDetail = new amzn.FaceDetail(),
        public Id: string = uuidv4(),
        public Confidence: number = 0,
        public Urls: string[] = new Array<string>()
    ) { }
}
