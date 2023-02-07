import mongoose from 'mongoose';
import {CartItemSchema} from "./CartItemSchema";

const { Schema } = mongoose;

export const CartSchema = new Schema<any>(
    {
        timestamp: { type: String, required: true },
        products: { type: [CartItemSchema], required: true },
    },
    { versionKey: false }
);
