import * as amzn from '../';
/**
 * 
 */
export class PersonDetail {
    /**
     * 
     * @param BoundingBox 
     * @param Face face detail
     * @param Index index used for person tracking
     */
    constructor(
        public BoundingBox: amzn.BoundingBox = new amzn.BoundingBox(),
        public Face: amzn.FaceDetail = new amzn.FaceDetail(),
        public Index: number = 0
    ) { }
}
