import * as amzn from '../';
import uuidv4 = require('uuidv4');

/**
 * @see https://docs.aws.amazon.com/rekognition/latest/dg/API_Face.html
 */
export class Face {
    /**
     * 
     * @param BoundingBox 
     * @param Confidence 
     * @param FaceId unique id for a face
     * @param ImageId id assigned to input image by the API
     * @param ExternalImageId id assigned to input image by user
     */
    constructor(
        public BoundingBox: amzn.BoundingBox = new amzn.BoundingBox(),
        public Confidence: number = 0,
        public FaceId: string = uuidv4(),
        public ImageId: string = uuidv4(),
        public ExternalImageId: string = 'id') { }
}
