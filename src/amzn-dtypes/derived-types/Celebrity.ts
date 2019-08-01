import uuid from 'uuidv4';
import * as amzn from '../';

/**
 * @see https://docs.aws.amazon.com/rekognition/latest/dg/API_Celebrity.html
 */
export class Celebrity {
    /**
     * 
     * @param Name 
     * @param Face 
     * @param Id 
     * @param MatchConfidence 
     * @param Urls list of urls containing additional information about celebrity
     */
    constructor(
        public Name: string = 'celebrity_name',
        public Face: amzn.ComparedFace = new amzn.ComparedFace(),
        public Id: string = uuid(),
        public MatchConfidence: number = 0,
        public Urls: string[] = []
    ) { }
}
