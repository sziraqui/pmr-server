export type LandmarkType = 'eyeLeft' | 'eyeRight' | 'nose' | 'mouthLeft' | 'mouthRight' | 'leftEyeBrowLeft' | 'leftEyeBrowRight' | 'leftEyeBrowUp' | 'rightEyeBrowLeft' | 'rightEyeBrowRight' | 'rightEyeBrowUp' | 'leftEyeLeft' | 'leftEyeRight' | 'leftEyeUp' | 'leftEyeDown' | 'rightEyeLeft' | 'rightEyeRight' | 'rightEyeUp' | 'rightEyeDown' | 'noseLeft' | 'noseRight' | 'mouthUp' | 'mouthDown' | 'leftPupil' | 'rightPupil' | 'upperJawlineLeft' | 'midJawlineLeft' | 'chinBottom' | 'midJawlineRight' | 'upperJawlineRight' | '';
export class Landmark {
    /**
     * 
     * @param Type 
     * @param X topLeftX/parentImageWidth
     * @param Y topLeftY/parentImageHeight
     */
    constructor(public Type: LandmarkType = '', public X: number = 0, public Y: number = 0) { }
}
