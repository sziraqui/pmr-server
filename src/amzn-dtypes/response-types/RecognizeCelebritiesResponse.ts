import * as amzn from '..';
/** 
 * @see https://docs.aws.amazon.com/rekognition/latest/dg/API_RecognizeCelebrities.html#API_RecognizeCelebrities_ResponseSyntax
*/
export type ImageOrientationCorrection = 'ROTATE_0' | 'ROTATE_90' | 'ROTATE_180' | 'ROTATE_270'

export class RecognizeCelebritiesResponse {
    /**
     * 
     * @param CelebrityFaces 
     * @param OrientationCorrection 
     */
    constructor(
        public CelebrityFaces: amzn.Celebrity[],
        public UnrecognizedFaces: amzn.ComparedFace[],
        public OrientationCorrection: ImageOrientationCorrection = null
    ) { }
}