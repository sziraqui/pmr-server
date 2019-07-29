/**
 * @see https://docs.aws.amazon.com/rekognition/latest/dg/API_Gender.html
 */
export type GenderValue = 'Male' | 'Female';
export class Gender {
    /**
     * 
     * @param Value 
     * @param Confidence 
     */
    constructor(public Value: GenderValue = 'Male', public Confidence: number = 0) { }
}
