import * as amzn from '../';
/**
 * @see https://docs.aws.amazon.com/rekognition/latest/dg/API_Label.html
 */
export class Label {
    /**
     * 
     * @param Name 
     * @param Confidence 
     * @param Instances
     * @param Parents array of parent label names
     */
    constructor(
        public Name: string = 'label_name',
        public Confidence: number = 0,
        public Instances: amzn.Instance[] = new Array<amzn.Instance>(),
        public Parents: amzn.Parent[] = new Array<amzn.Parent>()
    ) { }
}
