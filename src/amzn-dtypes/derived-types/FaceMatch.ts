import * as amzn from '../';
/**
 * @see https://docs.aws.amazon.com/rekognition/latest/dg/API_FaceMatch.html
 */
export class FaceMatch {
    /**
     * 
     * @param Face 
     * @param Similarity 
     */
    constructor(
        public Face: amzn.Face = new amzn.Face(),
        public Similarity: number = 0
    ) { }
}
