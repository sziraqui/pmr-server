import * as amzn from '../';
/**
 * @see https://docs.aws.amazon.com/rekognition/latest/dg/API_ComparedSourceImageFace.html
 */
export class ComparedSourceImageFace {
    /**
     * 
     * @param BoundingBox 
     * @param Confidence 
     */
    constructor(
        public BoundingBox: amzn.BoundingBox = new amzn.BoundingBox(),
        public Confidence: number = 0
    ) { }
}
