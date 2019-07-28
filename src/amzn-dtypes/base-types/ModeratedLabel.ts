export class ModeratedLabel {
    /**
     * 
     * @param Name label name of unsafe content
     * @param ParentName parent label name
     * @param Confidence 
     */
    constructor(public Name: string, public ParentName: string, public Confidence: number = 0) { }
}
