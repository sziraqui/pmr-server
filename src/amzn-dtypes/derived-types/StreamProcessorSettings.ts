import * as amzn from '../';
/**
 * @see https://docs.aws.amazon.com/rekognition/latest/dg/API_StreamProcessorSettings.html
 */
export class StreamProcessorSettings {
    /**
     * 
     * @param FaceSearch FaceSearchSettings
     */
    constructor(public FaceSearch: amzn.FaceSearchSettings = new amzn.FaceSearchSettings()) { }
}
