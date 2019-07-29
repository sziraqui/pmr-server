import * as amzn from '../';
/**
 * @see https://docs.aws.amazon.com/rekognition/latest/dg/API_FaceDetail.html
 */
export class FaceDetail {

    constructor(
        public BoundingBox: amzn.BoundingBox = new amzn.BoundingBox(),
        public AgeRange: amzn.AgeRange = new amzn.AgeRange(),
        public Beard: amzn.Beard = new amzn.Beard(),
        public Emotions: amzn.Emotion[] = new Array<amzn.Emotion>(),
        public Eyeglasses: amzn.Eyeglasses = new amzn.Eyeglasses(),
        public EyesOpen: amzn.EyeOpen = new amzn.EyeOpen(),
        public Gender: amzn.Gender = new amzn.Gender(),
        public Landmarks: amzn.Landmark[] = new Array<amzn.Landmark>(),
        public MouthOpen: amzn.MouthOpen = new amzn.MouthOpen(),
        public Mustache: amzn.Mustache = new amzn.Mustache(),
        public Pose: amzn.Pose = new amzn.Pose(),
        public Smile: amzn.Smile = new amzn.Smile(),
        public Sunglasses: amzn.Sunglasses = new amzn.Sunglasses(),
        public Quality: amzn.ImageQuality = new amzn.ImageQuality(),
        public Confidence: number = 0
    ) { }
}
