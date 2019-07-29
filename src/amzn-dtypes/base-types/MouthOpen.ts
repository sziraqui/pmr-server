/**
 * @see https://docs.aws.amazon.com/rekognition/latest/dg/API_MouthOpen.html
 */
export class MouthOpen {
    /**
     * 
     * @param Value true if mouth is open
     * @param Confidence 
     */
    constructor(public Value: boolean = false, public Confidence: number = 0) { }
}
