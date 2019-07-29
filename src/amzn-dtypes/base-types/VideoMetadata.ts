/**
 * @see https://docs.aws.amazon.com/rekognition/latest/dg/API_VideoMetadata.html
 */
export type VideoFormat = 'MOV' | 'MP4' | 'AVI';
export class VideoMetadata {
    /**
     * 
     * @param FrameWidth 
     * @param FrameHeight 
     * @param FrameRate 
     * @param DurationMillis 
     * @param Format 
     * @param Codec 
     */
    constructor(
        public FrameWidth: number = 0,
        public FrameHeight: number = 0,
        public FrameRate: number = 0,
        public DurationMillis: number = 0,
        public Format: VideoFormat = 'MP4',
        public Codec: string = 'codec'
    ) { }
}
