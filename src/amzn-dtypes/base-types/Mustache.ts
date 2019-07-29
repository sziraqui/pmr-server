/**
 * @see https://docs.aws.amazon.com/rekognition/latest/dg/API_Mustache.html
 */
export class Mustache {
    /**
     * 
     * @param Value true if mustache is present
     * @param Confidence 
     */
    constructor(public Value: boolean = false, public Confidence: number = 0) { }
}
