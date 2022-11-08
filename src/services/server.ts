import {ApiError} from "../exceptions/ApiError";

import express from "express";

import mainRouter from "../routes";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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