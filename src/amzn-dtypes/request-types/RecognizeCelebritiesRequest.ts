import * as amzn from "../";
/**
 * @see https://docs.aws.amazon.com/rekognition/latest/dg/API_RecognizeCelebrities.html#API_RecognizeCelebrities_RequestSyntax
 */

export class RecognizeCelebritiesRequest {
    /**
     * 
     * @param Image 
     */
    constructor(
        public Image: amzn.Image,
    ) { }
}