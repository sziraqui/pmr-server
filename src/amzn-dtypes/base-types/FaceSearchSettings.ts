import * as amzn from '../';
import uuidv4 = require('uuidv4');

export const FACE_MATCH_THRESHOLD_DEFAULT = 70;
/**
 * @see https://docs.aws.amazon.com/rekognition/latest/dg/API_FaceSearchSettings.html
 */
export class FaceSearchSettings {
    /**
     * 
     * @param CollectionId 
     * @param FaceMatchThreshold 
     */
    constructor(
        public CollectionId: string = uuidv4(),
        public FaceMatchThreshold: number = FACE_MATCH_THRESHOLD_DEFAULT
    ) { }
}
