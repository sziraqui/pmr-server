import * as amzn from '../';
/**
 * @see https://docs.aws.amazon.com/rekognition/latest/dg/API_ContentModerationDetection.html
 */
export class ContentModerationDetection {
    /**
     * 
     * @param ModerationLabel 
     * @param Timestamp 
     */
    constructor(
        public ModerationLabel: amzn.ModerationLabel = new amzn.ModerationLabel(),
        public Timestamp: number = 0
    ) { }
}
