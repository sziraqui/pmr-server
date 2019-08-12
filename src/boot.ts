import { FaceDetector, FaceModelParameters, Facenet, FaceClassifier } from '../../pmr-core';
import { DbConnection } from './dbclient';

export async function boot() {
    let params = new FaceModelParameters([__dirname]);
    FaceDetector.getInstance({ detector: 'mtcnn', weightsPath: params.getMtcnnLocation(), minConfidence: 0.5, drawBBox: false })
        .then(() => console.log('FaceDetector initialised'));
    Facenet.getInstance()
        .then(() => console.log('Facenet initialised'));
    FaceClassifier.getInstance()
        .then(() => console.log('FaceClassifier initialised'));
    DbConnection.getInstance();
}
