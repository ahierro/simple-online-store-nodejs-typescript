import {connectDb} from "./persistence/db";
import Config from './config/config';
import log4js from "log4js";
const { initWsServer } = require('./services/socket');

const app = require('./services/server');
const logger = log4js.getLogger();

const init = async () => {
    await connectDb();
    initWsServer(app);
    const server = app.listen(Config.PORT, () => {
        logger.info(`PID:${process.pid} Servidor http escuchando en http:\/\/localhost:${server.address().port}`);
    });

    server.on('error', (err) => {
        logger.error('Error en el servidor!! =>', err);
    });

};
init();





