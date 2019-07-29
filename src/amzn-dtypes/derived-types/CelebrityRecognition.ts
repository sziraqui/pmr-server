import * as amzn from '../';
/**
 * @see https://docs.aws.amazon.com/rekognition/latest/dg/API_CelebrityRecognition.html
 */
export class CelebrityRecognition {
    /**
     * 
     * @param Celebrity 
     * @param Timestamp timestamp in video when celebrity was recognised
     */
    constructor(
        public Celebrity: amzn.CelebrityDetail = new amzn.CelebrityDetail(),
        public Timestamp: number = 0
    ) { }
}
