import * as amzn from '../';
/**
 * 
 * @see https://docs.aws.amazon.com/rekognition/latest/dg/API_ComparedFace.html
 */
export class ComparedFace {
    /**
     *
     * @param BoundingBox 
     * @param Confidence 
     * @param Landmarks 
     * @param Pose 
     * @param Quality 
     */
    constructor(
        public BoundingBox: amzn.BoundingBox = new amzn.BoundingBox(),
        public Confidence: number = 0,
        public Landmarks: amzn.Landmark[] = [],
        public Pose: amzn.Pose = new amzn.Pose(),
        public Quality: amzn.ImageQuality = new amzn.ImageQuality()
    ) { }
}
