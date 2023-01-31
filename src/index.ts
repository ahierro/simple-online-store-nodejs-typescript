import {connectDb} from "./services/db";
const app = require('./services/server');
import Config from './config/config';
import cluster from 'cluster';
import log4js from "log4js";
const logger = log4js.getLogger();

const init = async () => {
    await connectDb();
    const server = app.listen(Config.PORT, () => {
        logger.info(`PID:${process.pid} Servidor http escuchando en el puerto ${server.address().port}`);
    });

    server.on('error', (err) => {
        logger.error('Error en el servidor!! =>', err);
    });

};
if(Config.MODE === 'cluster' && cluster.isPrimary) {
    logger.info(`cantidad de nucleos= ${Config.NUM_CPUS}`);
    logger.info(`PID MASTER= ${process.pid}`);
    for (let i = 0; i < Config.NUM_CPUS; i++) {
        cluster.fork()
    }
    cluster.on('exit', (worker, code) => {
        logger.info(`Worker ${worker.process.pid} died with code ${code}`);
        cluster.fork();
    })
} else {
    init();
}





