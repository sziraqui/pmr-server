/**
 * @see https://docs.aws.amazon.com/rekognition/latest/dg/API_ImageQuality.html
 */
const IMAGE_BRIGHTNESS_DEFAULT = 50,
    IMAGE_SHARPNESS_DEFAULT = 50;
export class ImageQuality {
    /**
     * 
     * @param Brightness [0-100] inclusive
     * @param Sharpness [0-100] inclusive
     */
    constructor(public Brightness: number = IMAGE_BRIGHTNESS_DEFAULT, public Sharpness: number = IMAGE_SHARPNESS_DEFAULT) { }
}
