import mongoose from 'mongoose';
import {CartItemSchema} from './CartItemSchema';

export const CartItemModel = mongoose.model<any>('products', CartItemSchema);