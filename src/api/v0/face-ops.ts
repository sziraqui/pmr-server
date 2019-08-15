import { Router, Response, Request } from 'express';
import { DetectFaces } from '../../controllers/DetectFaces';
import { sendUncached, sendError, sendCached } from '../../response-helper';
import * as httpStatus from 'http-status';
import { RecognizeCelebrities } from '../../controllers/RecognizeCelebrities';

export const router = Router();

router.post('/detect-faces', (req: Request, res: Response) => {
    new DetectFaces(req, res).run()
        .then(result => sendUncached(res, httpStatus.OK, result))
        .catch(err => sendError(req, res, err));
});

router.post('/recognize-celebrities', (req: Request, res: Response) => {
    new RecognizeCelebrities(req, res).run()
        .then(result => sendUncached(res, httpStatus.OK, result))
        .catch(err => sendError(req, res, err));
});

router.get('/', (req, res) => {
    res.status(httpStatus.OK).send(httpStatus[200]);
});