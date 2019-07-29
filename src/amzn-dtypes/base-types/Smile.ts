/**
 * @see https://docs.aws.amazon.com/rekognition/latest/dg/API_Smile.html
 */
export class Smile {
    /**
     * 
     * @param Value true if express denotes smile
     * @param Confidence 
     */
    constructor(public Value: boolean = false, public Confidence: number = 0) { }
}
