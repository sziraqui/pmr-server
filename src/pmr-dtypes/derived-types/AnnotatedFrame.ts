import * as amzn from '../../amzn-dtypes';

export class AnnotatedFrame {
    constructor(
        public CelebrityFaces: amzn.Celebrity[] = new Array<amzn.Celebrity>(),
        public UnrecognizedFaces: amzn.ComparedFace[] = new Array<amzn.ComparedFace>()
    ) {

    }
}