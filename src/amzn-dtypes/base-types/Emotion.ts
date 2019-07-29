/**
 * @see https://docs.aws.amazon.com/rekognition/latest/dg/API_Emotion.html
 */
export type EmotionType = 'HAPPY' | 'SAD' | 'ANGRY' | 'CONFUSED' | 'DISGUSTED' | 'SURPRISED' | 'CALM' | 'UNKNOWN';
export class Emotion {
    /**
     * Emotion based on face expression
     * @param Type 
     * @param Confidence 
     */
    constructor(public Type: EmotionType = 'UNKNOWN', public Confidence: number = 0) { }
}
