import mongoose from 'mongoose';
import {ChatMessageEntity} from "./ChatMessageEntity";

const {Schema} = mongoose;

export const ChatMessageSchema = new Schema<ChatMessageEntity>(
    {
        mail: {type: String, required: true},
        content: {type: String, required: true},
        timestamp: {type: String, required: true},
        type: {type: String, required: true},
    },
    {versionKey: false}
);
