import * as amzn from '../';
/**
 * @see https://docs.aws.amazon.com/rekognition/latest/dg/API_Video.html
 */
export class Video {
    /**
     * 
     * @param S3Object 
     * @param Url - Direct download link of video if S3Object is not provided
     */
    constructor(
        public S3Object: amzn.S3Object = new amzn.S3Object(),
        public Url: string = null) { }
}
