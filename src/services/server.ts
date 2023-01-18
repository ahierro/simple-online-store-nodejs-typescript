import {ApiError} from "../exceptions/ApiError";
import express from "express";
import mainRouter from "../routes";
import cookieParser from 'cookie-parser';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import Config from '../config/config';
import passport from 'passport';
import {loginFunc, signUpFunc} from "../routes/auth";
import compression from 'compression';
import log4js from 'log4js';

const app = express();

log4js.configure({
    appenders: {
        errorsFileAppender: { type: 'file', filename: './logs/errors.log' },
        warningsFileAppender: { type: 'file', filename: './logs/warnings.log' },
        console: { type: 'console' },
        "errors": {
            type: "logLevelFilter",
            appender: "errorsFileAppender",
            level: "error",
            maxLevel: "error"
        },
        "warnings": {
            type: "logLevelFilter",
            appender: "warningsFileAppender",
            level: "warn",
            maxLevel: "warn"
        }
    },
    categories: {
        default: { appenders: ['console','errors','warnings'], level: 'info' }
    },
});

interface SessionInfo {
    loggedIn: boolean;
    username : string;
    admin : boolean;
}

declare module 'express-session' {
    interface SessionData {
        info: SessionInfo;
    }
}
app.use(compression());
app.use(express.json());
app.use(cookieParser());
const logger = log4js.getLogger();

app.use((req, res, next) => {
    logger.info(`Request: ${req.method} ${req.url}`);
    next();
})
app.use(express.urlencoded({ extended: true }));
app.use(session({
    store: MongoStore.create({
        mongoUrl: Config.MONGO_SRV,
        crypto: {
            secret: Config.SECRET_MONGO,
        },
    }),
    secret: Config.SECRET_SESSION,
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: Config.SESSION_MAX_AGE
    },
}));
app.use(passport.initialize());

app.use(passport.session());

passport.use('login', loginFunc);
passport.use('signup', signUpFunc);
app.use('/api', mainRouter);
app.use(express.static('public'));
app.get('*', function(req, res){
    logger.warn(`Method+Path does not exist: ${req.method} ${req.url}`);
    res.status(405).json({message: 'Method not allowed'});
});

// MiddleWare for Error handling
app.use((err, req, res, next) => {
    logger.error(`Error:`,err);
    if(err instanceof ApiError){
        res.status(err?.status || 500).send({
            error: err?.message
        });
    }else {
        res.status(500).send({
            error: 'Ha Ocurrido un error interno del servidor'
        });
    }
});

module.exports = app;