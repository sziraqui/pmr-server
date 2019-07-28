export type Rectangle = { x: number, y: number, width: number, height: number }
export class BoundingBox {
    /**
     * Ratio-ed x,y coordinates of top-left corner of bounding box
     * and their width and height
     * @param Left topLeftX/parentImageWidth
     * @param Top topLeftY/parentImageHeight
     * @param Width boxWidth/parentImageWidth
     * @param Height boxHeight/parentImageHeight
     */
    constructor(public Left: number = 0, public Top: number = 0, public Width: number = 0, public Height: number = 0) { }

    static fromRect(rectangle: Rectangle, parentWidth: number, parentHeight: number) {
        return new BoundingBox(rectangle.x / parentWidth, rectangle.y / parentHeight, rectangle.width / parentWidth, rectangle.height / parentHeight)
    }

    toRect(targetWidth: number, targetHeight: number) {
        return {
            x: this.Left * targetWidth,
            y: this.Top * targetHeight,
            width: this.Width * targetWidth,
            height: this.Height / targetHeight
        }
    }
}
