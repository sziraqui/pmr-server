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
