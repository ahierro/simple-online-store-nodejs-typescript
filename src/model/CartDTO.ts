import {ProductDTO} from "./ProductDTO";
import {Entity} from "./Entity";
import {IsArray, IsDefined} from "class-validator";

export class CartDTO implements Entity{
    @IsArray()
    products: ProductDTO[];
    id: string;
    timestamp: string;
}