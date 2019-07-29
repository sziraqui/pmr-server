import * as amzn from '../';
/**
 * @see https://docs.aws.amazon.com/rekognition/latest/dg/API_StreamProcessorOutput.html
 */
export class StreamProcessorOutput {
    /**
     * 
     * @param KinesisDataStream 
     */
    constructor(public KinesisDataStream: amzn.KinesisDataStream = new amzn.KinesisDataStream()) { }
}
