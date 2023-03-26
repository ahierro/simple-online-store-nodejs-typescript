import {MongoDAO} from "./mongoDAO";
import {ChatMessageEntity} from "../model/mongo/ChatMessageEntity";
import {ChatMessageModel} from "../model/mongo/ChatMessageModel";

export default new MongoDAO<ChatMessageEntity>("ChatMessage",ChatMessageModel);