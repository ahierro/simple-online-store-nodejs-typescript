import mongoose from 'mongoose';
import {CartSchema} from "./CartSchema";

export const CartModel = mongoose.model<any>('carts', CartSchema);