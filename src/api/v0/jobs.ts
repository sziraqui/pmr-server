import { Router, Response, Request } from 'express';
import { sendUncached, sendError } from '../../response-helper';
import * as httpStatus from 'http-status';
import { DbHelper } from '../../dbclient';

export const router = Router();

router.get('/jobs/:jobId', (req: Request, res: Response) => {
    new DbHelper().getJobStatus(req.params.jobId)
        .then(result => sendUncached(res, httpStatus.OK, result))
        .catch(error => sendError(req, res, error));
});

router.get('/', (req, res) => {
    res.status(httpStatus.OK).send(httpStatus[200]);
});