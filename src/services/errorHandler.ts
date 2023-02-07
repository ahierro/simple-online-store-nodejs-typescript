import {ApiError} from "../exceptions/ApiError";
import log4js from "log4js";

const logger = log4js.getLogger();

export const errorHandler = (err, req, res, next) => {
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
}