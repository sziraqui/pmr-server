/**
 * @see https://docs.aws.amazon.com/rekognition/latest/dg/API_Sunglasses.html
 */
export class Sunglasses {
    /**
     * 
     * @param Value true if sunglasses present
     * @param Confidence 
     */
    constructor(public Value: boolean = false, public Confidence: number = 0) { }
}
