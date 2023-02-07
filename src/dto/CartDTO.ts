import {ProductDTO} from "./ProductDTO";
import {EntityDTO} from "./EntityDTO";
import {IsArray} from "class-validator";

export class CartDTO implements EntityDTO{
    _id: string;
    timestamp: string;
    @IsArray()
    products: ProductDTO[];
}