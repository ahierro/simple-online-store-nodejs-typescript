import {EntityDTO} from "./EntityDTO";
import {IsDefined, IsUrl, Min} from "class-validator";

export class ProductDTO implements EntityDTO{
    _id: string;
    @Min(0)
    @IsDefined()
    stock: number;
    @IsDefined()
    code: string;
    @IsDefined()
    description: string;
    @IsDefined()
    title: string;
    @Min(0)
    price: number;
    @IsUrl()
    thumbnail: string;
    timestamp: string;
}