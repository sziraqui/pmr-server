import * as amzn from "../";
/**
 * @see https://docs.aws.amazon.com/rekognition/latest/dg/API_DetectFaces.html#API_DetectFaces_RequestSyntax
 */
type Attribute = "ALL" | "DEFAULT";

export class DetectFacesRequest {
    /**
     * 
     * @param Image 
     * @param Attributes 
     */
    constructor(
        public Image: amzn.Image,
        public Attributes: Attribute[] = ["DEFAULT"],
    ) { }
}