import {connectDb} from "./services/db";
const app = require('./services/server');
import Config from './config/config';
const init = async () => {
    await connectDb();
    const server = app.listen(Config.PORT, () => {
        console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
    });

    server.on('error', (err) => {
        console.log('Error en el servidor!! =>', err);
    });

};

init();


