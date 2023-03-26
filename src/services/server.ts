import express from "express";
import mainRouter from "../routes";
import compression from 'compression';
import log4js from 'log4js';
import {errorHandler} from "./errorHandler";
import * as http from 'http';
import * as path from "path";
import swaggerUI from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import { info } from '../docs/info';

const app = express();

log4js.configure({
    appenders: {
        errorsFileAppender: { type: 'file', filename: './logs/errors.log' },
        console: { type: 'console' },
        "errors": {
            type: "logLevelFilter",
            appender: "errorsFileAppender",
            level: "error",
            maxLevel: "error"
        }
    },
    categories: {
        default: { appenders: ['console','errors'], level: 'info' }
    },
});

app.use(compression());
app.use(express.json());
app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerJSDoc(info)));
app.disable('x-powered-by');

const logger = log4js.getLogger();

app.use((req, res, next) => {
    logger.info(`Request: ${req.method} ${req.url}`);
    next();
})
app.use(express.urlencoded({ extended: true }));
app.use('/api', mainRouter);
app.get('/', async (req, res) => {
    res.render('chat',{});
});
app.use(express.static('public'));

app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, '../../views'));

app.get('*', function(req, res){
    logger.warn(`Method+Path does not exist: ${req.method} ${req.url}`);
    res.status(405).json({message: 'Method not allowed'});
});

// MiddleWare for Error handling
app.use(errorHandler);
const server = http.createServer(app);

module.exports = server;
export default server;