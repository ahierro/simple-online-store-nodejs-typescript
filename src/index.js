const app = require('./services/server');
const { initWsServer } = require('./services/socket');
const PORT = 8080;

(async () => {
    initWsServer(app);  //aca esta la magia
    const server = app.listen(PORT, () => console.log(`Server listening to port ${PORT}`));

    server.on('error', (err) => {
        console.log('Error on server', err);
    });
})()


