import {ProductDTO} from "./ProductDTO";
import {CartEntity} from "../persistence/model/mongo/CartEntity";
import {CartItemEntity} from "../persistence/model/mongo/CartItemEntity";

export class ProductInCartDTO extends ProductDTO{
    timestampCart: string;
    quantity: number;

    static fromCartItemEntityAndCartEntity(productEntity: CartItemEntity, cart: CartEntity) : ProductInCartDTO {
        const product = new ProductInCartDTO();
        product.id = productEntity._id;
        product.quantity = productEntity.quantity;
        product.stock = productEntity.stock;
        product.code = productEntity.code;
        product.description = productEntity.description;
        product.title = productEntity.title;
        product.price = productEntity.price;
        product.thumbnail = productEntity.thumbnail;
        product.timestamp = productEntity.timestamp;
        product.timestampCart = cart.timestamp;
        return product;
    }

    static toCartItemEntity(productEntity: ProductDTO, cart: CartEntity, quantity:number) : CartItemEntity {
        const product = new CartItemEntity();
        product._id = productEntity.id;
        product.stock = productEntity.stock;
        product.code = productEntity.code;
        product.description = productEntity.description;
        product.title = productEntity.title;
        product.price = productEntity.price;
        product.thumbnail = productEntity.thumbnail;
        product.timestamp = productEntity.timestamp;
        product.quantity = quantity;
        return product;
    }

    static fromProductInCartDTO(productEntity: ProductInCartDTO) : CartItemEntity {
        const product = new CartItemEntity();
        product._id = productEntity.id;
        product.stock = productEntity.stock;
        product.code = productEntity.code;
        product.description = productEntity.description;
        product.title = productEntity.title;
        product.price = productEntity.price;
        product.thumbnail = productEntity.thumbnail;
        product.timestamp = productEntity.timestamp;
        return product;
    }
}