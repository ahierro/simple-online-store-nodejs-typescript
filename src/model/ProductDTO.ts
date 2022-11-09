import {Entity} from "./Entity";

export interface ProductDTO extends Entity{
    id: string;
    stock: number;
    code: string;
    description: string;
    title: string;
    price: number;
    thumbnail: string;
}