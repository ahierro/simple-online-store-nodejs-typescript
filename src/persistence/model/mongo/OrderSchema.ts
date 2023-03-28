import mongoose from 'mongoose';
import {CartItemSchema} from "./CartItemSchema";
import {OrderEntity} from "./OrderEntity";

const { Schema } = mongoose;

export const OrderSchema = new Schema<OrderEntity>(
    {
        timestamp: { type: String, required: true },
        status: {type: String, required: true},
        email: {type: String, required: true},
        items: { type: [CartItemSchema], required: true },
    },
    { versionKey: false }
);
