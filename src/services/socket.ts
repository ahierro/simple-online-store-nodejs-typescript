import {ChatService} from "./chatService";
import {plainToClassFromExist} from "class-transformer";
import {ChatMessageDTO} from "../dto/ChatMessageDTO";
import log4js from "log4js";
import {getUserFromToken} from "./authService";
import {chatMessageDAO} from "../persistence/dao/factoryDAO";

const socketIo = require('socket.io');
const logger = log4js.getLogger();

let io;
const chatDAO = chatMessageDAO();
export const initWsServer = (server) => {
    io = socketIo(server);
    io.on('connection', async (socket) => {

        socket.on('emitMessage', async (msg) => {
            try {
                if (msg.token) {
                    const user = await getUserFromToken(msg.token);
                    if (user) {
                        const newMessage = plainToClassFromExist(new ChatMessageDTO(),
                            {
                                mail: user.email,
                                username: user.username,
                                content: msg.content,
                                type: 'user',
                                room: (msg.room == 'general' ? msg.room : user.email)
                            });
                        const persistedMessage = await ChatService.getInstance().insert(newMessage);
                        // io.clients[socket.client.id].send('newMessage', persistedMessage);
                        io.to(newMessage.room).emit('newMessage',persistedMessage);
                        socket.send
                    } else {
                        io.emit('error', "Invalid token");
                    }
                } else {
                    io.emit('error', "Invalid token");
                }
            } catch (e) {
                logger.error(e);
                io.emit('error', e);
            }
        });

        socket.on('JoinRoom', async (msg) => {
            const userModel = await getUserFromToken(msg.token);
            if (userModel) {
                const filters = {room: (msg.room == 'general' ? msg.room : userModel.email)};
                socket.join(filters.room);
                const messages = await chatDAO.getAllByFilters(filters);
                for (let message of messages) {
                    socket.emit('newMessage', message);
                }
            }
        });
    });
    return io;
};

export const getWsServer = () => {
    return io;
}

