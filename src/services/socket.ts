import {ChatService} from "./chatService";
import {plainToClassFromExist} from "class-transformer";
import {ChatMessageDTO} from "../dto/ChatMessageDTO";
import log4js from "log4js";

const socketIo = require('socket.io');
const logger = log4js.getLogger();

let io;

const initWsServer = (server) => {
  io = socketIo(server);
  io.on('connection', async (socket) => {

    const messages =  await ChatService.getInstance().getAll();
    for (let message of messages) {
      socket.emit('newMessage', message);
    }

    socket.on('emitMessage', async (msg) => {
      try{
        const newMessage = plainToClassFromExist(new ChatMessageDTO(), msg)
        const persistedMessage = await ChatService.getInstance().insert(newMessage);
        io.emit('newMessage',persistedMessage);
      }catch (e){
        logger.error(e);
        io.emit('error',e);
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
