import {ProductDTO} from "./ProductDTO";
import {Entity} from "./Entity";
import {IsArray, IsDefined} from "class-validator";

export class CartDTO implements Entity{
    _id: string;
    timestamp: string;
    @IsArray()
    products: ProductDTO[];
}