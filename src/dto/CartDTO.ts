import {EntityDTO} from "./EntityDTO";
import {IsArray} from "class-validator";
import {ProductInCartDTO} from "./ProductInCartDTO";
import {CartEntity} from "../persistence/model/mongo/CartEntity";

export class CartDTO implements EntityDTO{
    id: string;
    timestamp: string;
    @IsArray()
    products: ProductInCartDTO[];

    static from(cartEntity: CartEntity) : CartDTO {
        const dto = new CartDTO();
        dto.id = cartEntity._id;
        dto.timestamp = cartEntity.timestamp;
        if(cartEntity.products && cartEntity.products.length > 0) {
            dto.products = cartEntity.products.map(product => ProductInCartDTO.fromCartItemEntityAndCartEntity(product,cartEntity));
        }
        return dto;
    }

    static to(dto: CartDTO) : CartEntity {
        const entity = new CartEntity();
        entity._id = dto.id;
        entity.timestamp = dto.timestamp;
        entity.products = dto.products.map(product => ProductInCartDTO.fromProductInCartDTO(product));
        return entity;
    }
}