const socketIo = require('socket.io');
let io;

const initWsServer = (server) => {
  io = socketIo(server);

  return io;
};


const getWsServer = () => {
  return io;
}

module.exports = {
  initWsServer,
  getWsServer
};
