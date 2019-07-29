import * as amzn from '../';
/**
 * @see https://docs.aws.amazon.com/rekognition/latest/dg/API_UnindexedFace.html
 */
export type UnindexedFaceReason = 'EXCEEDS_MAX_FACES' | 'EXTREME_POSE' | 'LOW_BRIGHTNESS' | 'LOW_SHARPNESS' | 'LOW_CONFIDENCE' | 'SMALL_BOUNDING_BOX'
export class UnindexedFace {
    /**
     * 
     * @param FaceDetail 
     * @param Reasons 
     */
    constructor(
        public FaceDetail: amzn.FaceDetail = new amzn.FaceDetail(),
        public Reasons: UnindexedFaceReason[] = new Array<UnindexedFaceReason>()
    ) { }
}
