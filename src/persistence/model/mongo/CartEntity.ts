import {CartItemEntity} from "./CartItemEntity";

export class CartEntity {
    _id?: string;
    timestamp: string;
    products: CartItemEntity[];
}