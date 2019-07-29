/**
 * @see https://docs.aws.amazon.com/rekognition/latest/dg/API_Eyeglasses.html
 */
export class Eyeglasses {
    /**
     * 
     * @param Value true if eye glasses are present
     * @param Confidence 
     */
    constructor(public Value: boolean = false, public Confidence: number = 0) { }
}
