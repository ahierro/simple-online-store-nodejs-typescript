import {connectDb} from "./persistence/db";
import Config from './config/config';
import log4js from "log4js";
import app from "./services/server";

const logger = log4js.getLogger();

const init = async () => {
    await connectDb();
    const server = app.listen(Config.PORT, () => {
        logger.info(`PID:${process.pid} Servidor http escuchando en el puerto ${Config.PORT}`);
    });

    server.on('error', (err) => {
        logger.error('Error en el servidor!! =>', err);
    });

};
init();





