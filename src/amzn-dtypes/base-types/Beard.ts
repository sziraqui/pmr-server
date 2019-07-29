/**
 * @see https://docs.aws.amazon.com/rekognition/latest/dg/API_Beard.html
 */
export class Beard {
    /**
     * 
     * @param Value Boolean indicating presence of beard
     * @param Confidence 
     */
    constructor(public Value: boolean = false, public Confidence: number = 0) { }
}
