import {ProductDTO} from "./ProductDTO";
import {Entity} from "./Entity";

export interface CartDTO extends Entity{
    products: ProductDTO[];
}