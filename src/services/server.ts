import Koa from 'koa';
import koaBody from 'koa-body';
import mainRouter from "../routes";
import log4js from 'log4js';
import {ApiError} from "../exceptions/ApiError";

log4js.configure({
    appenders: {
        errorsFileAppender: {type: 'file', filename: './logs/errors.log'},
        console: {type: 'console'},
        "errors": {
            type: "logLevelFilter",
            appender: "errorsFileAppender",
            level: "error",
            maxLevel: "error"
        }
    },
    categories: {
        default: {appenders: ['console', 'errors'], level: 'info'}
    },
});

const logger = log4js.getLogger();

const app = new Koa();

app.use(koaBody());

app.use(async (ctx: Koa.Context, next: Koa.Next) => {
    try {
        await next();
    } catch (err) {
        logger.error(`Error:`, err);
        if (err instanceof ApiError) {
            ctx.body = {
                error: err?.message
            };
            ctx.status = err?.status || 500;
        } else {
            ctx.body = {
                error: 'Ha Ocurrido un error interno del servidor'
            };
            ctx.status = 500;
        }
        ctx.app.emit('error', err, ctx);
    }
});

app.use(mainRouter);

export default app;