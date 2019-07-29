import * as amzn from '../';
/**
 * @see https://docs.aws.amazon.com/rekognition/latest/dg/API_Image.html
 */
export const MAX_BLOB_LENGTH = 5242880;
export class Image {
    /**
     * 
     * @param Bytes bas64 image
     * @param S3Object 
     */
    constructor(
        public Bytes: string = '',
        public S3Object: amzn.S3Object = new amzn.S3Object()
    ) { }
}
