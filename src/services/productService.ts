import {GenericService} from "./genericService";
import {ProductRepository} from "../persistence/repository/productRepository";
import {ProductDTO} from "../dto/ProductDTO";

export class ProductService extends GenericService<ProductDTO> {
    private static instance: ProductService;

    static getInstance(): ProductService {
        if (!this.instance) {
            ProductService.instance = new ProductService();
        }

        return ProductService.instance;
    }

    private constructor() {
        super(ProductRepository.getInstance());
    }
}