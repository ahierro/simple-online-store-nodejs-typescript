import mongoose from 'mongoose';
import {OrderSchema} from "./OrderSchema";

export const OrderModel = mongoose.model<any>('orders', OrderSchema);