import * as amzn from '../';
/**
 * @see https://docs.aws.amazon.com/rekognition/latest/dg/API_LabelDetection.html
 */
export class LabelDetection {
    /**
     * 
     * @param Label 
     * @param Timestamp 
     */
    constructor(
        public Label: amzn.Label = new amzn.Label(),
        public Timestamp: number = 0
    ) { }
}
