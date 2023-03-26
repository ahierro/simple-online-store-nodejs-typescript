import {GenericRepository} from "./genericRepository";
import {CartDTO} from "../../dto/CartDTO";
import {cartDAO} from "../dao/factoryDAO";
import {GenericDAO} from "../dao/genericDAO";
import {CartEntity} from "../model/mongo/CartEntity";
import {ProductRepository} from "./productRepository";
import {UtilService} from "../../services/utilService";
import {ProductInCartDTO} from "../../dto/ProductInCartDTO";

export class CartRepository implements GenericRepository<CartDTO> {

    private static instance: CartRepository;

    static getInstance(): CartRepository {
        if (!this.instance) {
            CartRepository.instance = new CartRepository(cartDAO());
        }

        return CartRepository.instance;
    }

    private constructor(private dao: GenericDAO<CartEntity>) {
    }

    async insert(obj: CartDTO) {
        return CartDTO.from(await this.dao.insert(CartDTO.to(obj)));
    }

    async update(id, obj: CartDTO) {
        return CartDTO.from(await this.dao.update(id, CartDTO.to(obj)));
    }

    async getById(id) {
        return CartDTO.from(await this.dao.getById(id));
    }

    async getAll() {
        return (await this.dao.getAll()).map(x => CartDTO.from(x));
    }

    async getAllByFilters(filters) {
        return (await this.dao.getAllByFilters(filters)).map(x => CartDTO.from(x));
    }

    async deleteById(id) {
        return CartDTO.from(await this.dao.deleteById(id));
    }

    async addProduct(idCart, idProd, quantity) {
        const cart = await this.dao.getById(idCart);
        if (cart?.products) {
            const product = await ProductRepository.getInstance().getById(idProd);
            UtilService.insertOrUpdateById(cart.products, ProductInCartDTO.toCartItemEntity(product, cart, quantity));
        }
        return CartDTO.from(await this.dao.update(idCart, cart));
    }

    async deleteProduct(idCart, idProd) {
        const cart = await this.dao.getById(idCart);
        if (cart && cart.products) {
            cart.products = cart.products.filter(p => p._id.toString() !== idProd);
        }
        return await this.dao.update(idCart, cart);
    }
}