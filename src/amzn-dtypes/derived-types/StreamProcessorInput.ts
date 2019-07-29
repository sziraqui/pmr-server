import * as amzn from '../';
/**
 * @see https://docs.aws.amazon.com/rekognition/latest/dg/API_StreamProcessorInput.html
 */
export class StreamProcessorInput {
    /**
     * 
     * @param KinesisVideoStream 
     */
    constructor(public KinesisVideoStream: amzn.KinesisVideoStream = new amzn.KinesisVideoStream()) { }
}
