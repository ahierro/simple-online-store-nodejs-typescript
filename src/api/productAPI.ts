import {productService} from "../services/productService";
import {plainToClassFromExist} from "class-transformer";
import {ProductDTO} from "../dto/ProductDTO";

export class ProductAPI {

    async getAll() {
        return await productService.getAll();
    }

    async getById(id) {
        return await productService.getById(id);
    }

    async create(requestBody) {
        return await productService.insert(plainToClassFromExist(new ProductDTO(), requestBody));
    }

    async update(id, requestBody) {
        return await productService.update(id, plainToClassFromExist(new ProductDTO(), requestBody));
    }

    async deleteById(id) {
        return await productService.deleteById(id);
    }

}