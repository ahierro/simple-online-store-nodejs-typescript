import mongoose from 'mongoose';
import {ChatMessageSchema} from './ChatMessageSchema';

export const ChatMessageModel = mongoose.model<any>('messages', ChatMessageSchema);