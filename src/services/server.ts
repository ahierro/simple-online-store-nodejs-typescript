import {ApiError} from "../exceptions/ApiError";
import express from "express";
import mainRouter from "../routes";
import cookieParser from 'cookie-parser';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import Config from '../config/config';
import passport from 'passport';
import {loginFunc, signUpFunc} from "../routes/auth";

const app = express();

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

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    store: MongoStore.create({
        mongoUrl: Config.MONGO_SRV,
        crypto: {
            secret: 'squirrel',
        },
    }),
    secret: 's3cr3ts2cr3t',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 60000,
    },
}));
app.use(passport.initialize());

app.use(passport.session());

passport.use('login', loginFunc);
passport.use('signup', signUpFunc);
app.use('/api', mainRouter);
app.use(express.static('public'));


// MiddleWare for Error handling
app.use((err, req, res, next) => {
    console.error("Error:",err);
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