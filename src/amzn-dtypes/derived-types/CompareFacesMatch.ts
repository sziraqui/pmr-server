import * as amzn from '../';
/**
 * @see https://docs.aws.amazon.com/rekognition/latest/dg/API_CompareFacesMatch.html
 */
export class CompareFacesMatch {
    /**
     * 
     * @param Face ComparedFace
     * @param Similarity 
     */
    constructor(
        public Face: amzn.ComparedFace = new amzn.ComparedFace(),
        public Similarity: number = 0
    ) { }
}
