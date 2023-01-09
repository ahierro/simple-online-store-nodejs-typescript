import {connectDb} from "./services/db";
const app = require('./services/server');
import Config from './config/config';
import cluster from 'cluster';
const init = async () => {
    await connectDb();
    const server = app.listen(Config.PORT, () => {
        console.log(`PID:${process.pid} Servidor http escuchando en el puerto ${server.address().port}`);
    });

    server.on('error', (err) => {
        console.log('Error en el servidor!! =>', err);
    });

};
if(Config.MODE === 'cluster' && cluster.isPrimary) {
    console.log(`cantidad de nucleos= ${Config.NUM_CPUS}`);
    console.log(`PID MASTER= ${process.pid}`);
    for (let i = 0; i < Config.NUM_CPUS; i++) {
        cluster.fork()
    }
    cluster.on('exit', (worker, code) => {
        console.log(`Worker ${worker.process.pid} with code ${code}`);
        cluster.fork();
    })
} else {
    init();
}





