/**
 * @see https://docs.aws.amazon.com/rekognition/latest/dg/API_EyeOpen.html
 */
export class EyeOpen {
    /**
     * 
     * @param Value true if eye is open
     * @param Confidence 
     */
    constructor(public Value: boolean = false, public Confidence: number = 0) { }
}
