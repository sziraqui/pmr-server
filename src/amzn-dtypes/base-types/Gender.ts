export type GenderValue = 'Male' | 'Female';
export class Gender {
    /**
     * 
     * @param Value 
     * @param Confidence 
     */
    constructor(public Value: GenderValue = 'Male', public Confidence: number = 0) { }
}
