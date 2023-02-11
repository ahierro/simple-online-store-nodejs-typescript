import mongoose from 'mongoose';
import {CartItemSchema} from "./CartItemSchema";
import {CartEntity} from "./CartEntity";

const { Schema } = mongoose;

export const CartSchema = new Schema<CartEntity>(
    {
        timestamp: { type: String, required: true },
        products: { type: [CartItemSchema], required: true },
    },
    { versionKey: false }
);
