import { Response, Request } from "express";

export function sendCached(res: Response, statusCode: number, body: Object, cacheAgeInSeconds) {
    res.setHeader('Cache-Control', `public, max-age=${cacheAgeInSeconds}`);
    res.status(statusCode).json(body);
}

export function sendUncached(res: Response, statusCode: number, body: Object) {
    res.status(statusCode).json(body);
}

export function sendError(req: Request, res: Response, err) {
    // set locals, only providing error in development
    console.log(err);
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500).send('Something went wrong. Try again later');
}