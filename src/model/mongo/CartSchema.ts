import mongoose from 'mongoose';
const { Schema } = mongoose;
import {CartItemSchema} from "./CartItemSchema";

export const CartSchema = new Schema<any>(
    {
        timestamp: { type: String, required: true },
        products: { type: [CartItemSchema], required: true },
    },
    { versionKey: false }
);
