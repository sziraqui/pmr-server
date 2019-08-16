import { Router, Response, Request } from 'express';
import { sendUncached, sendError } from '../../response-helper';
import * as httpStatus from 'http-status';
import { CelebrityInVideo } from '../../controllers/CelebrityInVideo';

export const router = Router();

router.post('/celebrity-in-video', (req: Request, res: Response) => {
    new CelebrityInVideo(req, res).run()
        .then(result => sendUncached(res, httpStatus.OK, result))
        .catch(err => sendError(req, res, err));
});

router.get('/', (req, res) => {
    res.status(httpStatus.OK).send(httpStatus[200]);
});