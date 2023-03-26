import mongoose from 'mongoose';

const {Schema} = mongoose;

export const CartItemSchema = new Schema<any>(
    {
        quantity: {type: Number, required: true},
        code: {type: String, required: true},
        category: {type: String, required: true},
        description: {type: String, required: true},
        title: {type: String, required: true},
        price: {type: Number, required: true},
        thumbnail: {type: String, required: true},
        timestamp: {type: String, required: true},
    },
    {versionKey: false}
);
