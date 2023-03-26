import {GenericRepository} from "./genericRepository";
import {ProductDTO} from "../../dto/ProductDTO";
import {productDAO} from "../dao/factoryDAO";
import {GenericDAO} from "../dao/genericDAO";
import {ProductEntity} from "../model/mongo/ProductEntity";

export class ProductRepository implements GenericRepository<ProductDTO> {

    private static instance: ProductRepository;

    static getInstance(): ProductRepository {
        if (!this.instance) {
            ProductRepository.instance = new ProductRepository(productDAO());
        }

        return ProductRepository.instance;
    }

    private constructor(private dao: GenericDAO<ProductEntity>) {
    }

    async insert(obj: ProductDTO) {
        return ProductDTO.from(await this.dao.insert(ProductDTO.to(obj)));
    }

    async update(id, obj: ProductDTO) {
        return ProductDTO.from(await this.dao.update(id, ProductDTO.to(obj)));
    }

    async getById(id) {
        return ProductDTO.from(await this.dao.getById(id));
    }

    async getAll() {
        return (await this.dao.getAll()).map(x => ProductDTO.from(x));
    }
    async getAllByFilters(filters) {
        return (await this.dao.getAllByFilters(filters)).map(x => ProductDTO.from(x));
    }
    async deleteById(id) {
        return ProductDTO.from(await this.dao.deleteById(id));
    }

}