/**
 * @see https://docs.aws.amazon.com/rekognition/latest/dg/API_S3Object.html
 */
export class S3Object {
    /**
     * 
     * @param Bucket 
     * @param Name 
     * @param Version 
     */
    constructor(public Bucket: string = '', public Name: string = '', public Version: string = '') {
        // TODO: add regex based validation
    }
}
