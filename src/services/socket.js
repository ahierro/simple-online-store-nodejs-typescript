const socketIo = require('socket.io');
const moment = require('moment');
const { chatService } = require('../services/chatService');

let io;

const initWsServer = (server) => {
  io = socketIo(server);
  io.on('connection', async (socket) => {

    const messages =  await chatService.getAll();
    for (let message of messages) {
      socket.emit('newMessage', message);
    }

    socket.on('emitMessage', async (msg) => {
      try{
        const newMessage = {...msg,time:moment().format("D/M/YYYY HH:mm:ss")};
        await chatService.insert(newMessage);
        io.emit('newMessage',newMessage);
      }catch (e){
        console.log(e)
      }
    });
  });
  return io;
};


const getWsServer = () => {
  return io;
}

module.exports = {
  initWsServer,
  getWsServer
};
