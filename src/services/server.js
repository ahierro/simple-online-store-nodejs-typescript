const express = require("express");
const mainRouter = require("../routes");
const ApiError = require("../exceptions/ApiError");
const path = require('path');
const http = require('http');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, '../../views'));

app.use('/', mainRouter);
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
const server = http.Server(app);

module.exports = server;