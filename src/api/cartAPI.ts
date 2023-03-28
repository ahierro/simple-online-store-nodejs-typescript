import {plainToClassFromExist} from "class-transformer";
import {CartDTO} from "../dto/CartDTO";
import {sendMail} from "../services/emailService";
import {sendSms, sendWhatsapp} from "../services/twilioService";
import {header} from "../templates/mail/header";
import {rowsGenerate} from "../templates/mail/rows";
import {footer} from "../templates/mail/footer";
import {CartService} from "../services/cartService";
import {GenericDAO} from "../persistence/dao/genericDAO";
import {OrderEntity} from "../persistence/model/mongo/OrderEntity";
import {orderDAO} from "../persistence/dao/factoryDAO";

export class CartAPI {
    private static instance: CartAPI;

    static getInstance(): CartAPI {
        if (!this.instance) {
            CartAPI.instance = new CartAPI(orderDAO());
        }

        return CartAPI.instance;
    }

    private constructor(private orderDao: GenericDAO<OrderEntity>) {
    }

    async create(requestBody) {
        return await CartService.getInstance().insert(plainToClassFromExist(new CartDTO(), requestBody));
    }

    async deleteById(id) {
        return await CartService.getInstance().deleteById(id);
    }

    async getProductsById(id) {
        const cart = await CartService.getInstance().getById(id);
        return cart.products || [];
    }

    async addProduct(idCart, idProd, quantity) {
        return await CartService.getInstance().addProduct(idCart, idProd, quantity);
    }

    async deleteProduct(idCart, idProd) {
        return await CartService.getInstance().deleteProduct(idCart, idProd);
    }

    async checkout(id, user) {
        const cart = (await CartService.getInstance().getById(id));
        if (cart) {
            await this.createOrder(user, cart);

            const subject = `New order from ${user.username}  ${user.email} `;

            await this.sendMailToAdmin(cart, subject);
            // @ts-ignore
            await sendSms(user.phone, "Your order is being processed");
            // @ts-ignore
            await sendWhatsapp(user.phone, subject);
        }
    }

    private async sendMailToAdmin(cart: CartDTO, subject) {
        const rows = cart.products.map(p => {
            return rowsGenerate(p);
        }).join("");
        // @ts-ignore
        await sendMail(subject, header + rows + footer);
    }

    private async createOrder(user, cart: CartDTO) {
        const orderEntity = new OrderEntity();
        orderEntity.email = user.email;
        orderEntity.items = cart.products;
        orderEntity.status = "generated";
        orderEntity.timestamp = new Date().toISOString();
        await this.orderDao.insert(orderEntity);
    }
}