import {EntityDTO} from "./EntityDTO";
import {IsDefined, IsUrl, Min} from "class-validator";
import {ProductEntity} from "../persistence/model/mongo/ProductEntity";

export class ProductDTO implements EntityDTO{
    id: string;
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

    static from(data: ProductEntity) : ProductDTO {
        const product = new ProductDTO();
        product.id = data._id;
        product.stock = data.stock;
        product.code = data.code;
        product.description = data.description;
        product.title = data.title;
        product.price = data.price;
        product.thumbnail = data.thumbnail;
        product.timestamp = data.timestamp;
        return product;
    }

    static to(data: ProductDTO) : ProductEntity {
        const product = new ProductEntity();
        product._id = data.id;
        product.stock = data.stock;
        product.code = data.code;
        product.description = data.description;
        product.title = data.title;
        product.price = data.price;
        product.thumbnail = data.thumbnail;
        product.timestamp = data.timestamp;
        return product;
    }
}