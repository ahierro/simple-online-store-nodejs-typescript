import {CartItemEntity} from "./CartItemEntity";

export class OrderEntity {
    _id?: string;
    timestamp: string;
    status: string;
    email: string;
    items: CartItemEntity[];
}