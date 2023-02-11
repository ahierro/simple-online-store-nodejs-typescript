import {GenericService} from "./genericService";
import {CartRepository} from "../persistence/repository/cartRepository";
import {CartDTO} from "../dto/CartDTO";

export class CartService extends GenericService<CartDTO> {
    private static instance: CartService;

    static getInstance(): CartService {
        if (!this.instance) {
            CartService.instance = new CartService();
        }

        return CartService.instance;
    }

    private constructor() {
        super(CartRepository.getInstance());
    }

    async addProduct(idCart, idProd, quantity) {
        return await CartRepository.getInstance().addProduct(idCart, idProd, quantity);
    }

    async deleteProduct(idCart, idProd) {
        return await CartRepository.getInstance().deleteProduct(idCart, idProd);
    }
}
