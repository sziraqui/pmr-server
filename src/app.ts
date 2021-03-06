import express, { Request, Response } from "express";
import logger from "morgan";
import * as bodyParser from "body-parser";
import * as path from "path";
import showError from "http-errors";
import cors from "cors";
import { environment as ENV } from '../config/default.json'
const config = require('../config/default.json')[ENV];

export const app: express.Application = express();

app.use(logger('dev'));
/** Request payload limits
 * Source: https://stackoverflow.com/a/36514330/6699069
 */
app.use(bodyParser.json({ limit: config.rest.max_json_size }));
app.use(bodyParser.urlencoded({ limit: config.rest.max_urlencoded_size, extended: true, parameterLimit: config.rest.max_params }));
/** For CORS */
app.use(cors());
app.options('*', cors());
/** static files */
app.use(express.static(path.join(__dirname, '..', 'public')));
/** All endpoints */
app.use('/api/v0', require('./api/v0/face-ops').router);
app.use('/api/v0', require('./api/v0/jobs').router);
app.use('/api/v0', require('./api/v0/video-face-ops').router);

/** Error handler */
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(showError(404));
});
// error handler
app.use(function (err, req: Request, res: Response, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    console.log(err);
    res.send('Something went wrong');

});
