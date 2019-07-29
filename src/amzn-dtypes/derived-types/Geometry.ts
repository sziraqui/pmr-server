import * as amzn from '../';
/**
 * @see https://docs.aws.amazon.com/rekognition/latest/dg/API_Geometry.html
 */
export class Geometry {
    /**
     * 
     * @param BoundingBox 
     * @param Polygon 
     */
    constructor(
        public BoundingBox: amzn.BoundingBox = new amzn.BoundingBox(),
        public Polygon: amzn.Point[] = new Array<amzn.Point>()
    ) { }
}
