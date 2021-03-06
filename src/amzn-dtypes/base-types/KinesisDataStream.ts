import uuidv4 = require("uuidv4");

/**
 * @see https://docs.aws.amazon.com/rekognition/latest/dg/API_KinesisDataStream.html
 */
export class KinesisDataStream {
    /**
     * 
     * @param Arn 
     */
    constructor(public Arn: string = uuidv4()) { }
}
