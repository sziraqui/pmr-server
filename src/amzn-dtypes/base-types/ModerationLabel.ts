export class ModerationLabel {
    /**
     * 
     * @param Name label name of unsafe content
     * @param ParentName parent label name
     * @param Confidence 
     */
    constructor(public Name: string = 'unsafe_content', public ParentName: string = 'parent_label', public Confidence: number = 0) { }
}
