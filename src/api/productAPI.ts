import {plainToClassFromExist} from "class-transformer";
import {ProductDTO} from "../dto/ProductDTO";
import {ProductService} from "../services/productService";

export class ProductAPI {

    private static instance: ProductAPI;

    static getInstance(): ProductAPI {
        if (!this.instance) {
            ProductAPI.instance = new ProductAPI();
        }

        return ProductAPI.instance;
    }

    private constructor() {
    }

    async getAll(category) {
        if(category){
            return await ProductService.getInstance().getAllByCategory(category);
        }else{
            return await ProductService.getInstance().getAll();
        }
    }

    async getById(id) {
        return await ProductService.getInstance().getById(id);
    }

    async create(requestBody) {
        return await ProductService.getInstance().insert(plainToClassFromExist(new ProductDTO(), requestBody));
    }

    async update(id, requestBody) {
        return await ProductService.getInstance().update(id, plainToClassFromExist(new ProductDTO(), requestBody));
    }

    async deleteById(id) {
        return await ProductService.getInstance().deleteById(id);
    }

}