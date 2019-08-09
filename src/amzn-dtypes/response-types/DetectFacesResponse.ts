import * as amzn from '../';
/** 
 * @see https://docs.aws.amazon.com/rekognition/latest/dg/API_DetectFaces.html#API_DetectFaces_ResponseSyntax
*/
type ImageOrientationCorrection = 'ROTATE_0' | 'ROTATE_90' | 'ROTATE_180' | 'ROTATE_270'

export class DetectFacesResponse {
    /**
     * 
     * @param FaceDetails 
     * @param OrientationCorrection 
     */
    constructor(
        public FaceDetails: amzn.FaceDetail[],
        public OrientationCorrection: ImageOrientationCorrection = null
    ) { }
}