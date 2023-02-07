import mongoose from 'mongoose';
import {ProductSchema} from './ProductSchema';

export const ProductModel = mongoose.model<any>('products', ProductSchema);