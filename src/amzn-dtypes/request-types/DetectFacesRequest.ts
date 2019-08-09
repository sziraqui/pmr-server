import * as amzn from "../";
/**
 * @see https://docs.aws.amazon.com/rekognition/latest/dg/API_DetectFaces.html#API_DetectFaces_RequestSyntax
 */
export type DetectFacesRequestAttribute = "ALL" | "DEFAULT";

export class DetectFacesRequest {
    /**
     * 
     * @param Image 
     * @param Attributes 
     */
    constructor(
        public Image: amzn.Image,
        public Attributes: DetectFacesRequestAttribute[] = ["DEFAULT"],
    ) { }
}