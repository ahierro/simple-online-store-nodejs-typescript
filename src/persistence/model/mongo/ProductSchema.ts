import mongoose from 'mongoose';
import {ProductEntity} from "./ProductEntity";

const {Schema} = mongoose;

export const ProductSchema = new Schema<ProductEntity>(
    {
        stock: {type: Number, required: true},
        code: {type: String, required: true},
        description: {type: String, required: true},
        title: {type: String, required: true},
        price: {type: Number, required: true},
        thumbnail: {type: String, required: true},
        timestamp: {type: String, required: true},
    },
    {versionKey: false}
);
