import * as amzn from '../';
/**
 * @see https://docs.aws.amazon.com/rekognition/latest/dg/API_PersonDetection.html
 */
export class API_PersonDetection {
    /**
     * 
     * @param Person PersonDetail
     * @param Timestamp 
     */
    constructor(
        public Person: amzn.PersonDetail = new amzn.PersonDetail(),
        public Timestamp: number = 0
    ) { }
}
