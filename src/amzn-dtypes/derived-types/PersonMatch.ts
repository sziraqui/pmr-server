import * as amzn from '../';
/**
 * @see https://docs.aws.amazon.com/rekognition/latest/dg/API_PersonMatch.html
 */
export class PersonMatch {
    /**
     * 
     * @param Person 
     * @param FaceMatches 
     * @param Timestamp 
     */
    constructor(
        public Person: amzn.PersonDetail = new amzn.PersonDetail(),
        public FaceMatches: amzn.FaceMatch[] = new Array<amzn.FaceMatch>(),
        Timestamp: number = 0
    ) { }
}
