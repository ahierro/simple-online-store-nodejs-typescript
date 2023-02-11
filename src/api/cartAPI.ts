import {plainToClassFromExist} from "class-transformer";
import {CartDTO} from "../dto/CartDTO";
import {sendMail} from "../services/emailService";
import {sendSms, sendWhatsapp} from "../services/twilioService";
import {header} from "../templates/mail/header";
import {rowsGenerate} from "../templates/mail/rows";
import {footer} from "../templates/mail/footer";
import {CartService} from "../services/cartService";

export class CartAPI {
    private static instance: CartAPI;

    static getInstance(): CartAPI {
        if (!this.instance) {
            CartAPI.instance = new CartAPI();
        }

        return CartAPI.instance;
    }

    private constructor() {
    }

    async create(requestBody) {
        return await CartService.getInstance().insert(plainToClassFromExist(new CartDTO(), requestBody));
    }

    async deleteById(id) {
        return await CartService.getInstance().deleteById(id);
    }

    async getProductsById(id) {
        const cart = await CartService.getInstance().getById(id);
        return cart.products;
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
            const rows = cart.products.map(p => {
                return rowsGenerate(p);
            }).join("");
            // @ts-ignore
            const subject = `nuevo pedido de ${user.username}  ${user.email} `;
            await sendMail(subject, header + rows + footer);
            // @ts-ignore
            await sendSms(user.phone, "Su pedido ha sido recibido y se encuentra en proceso");
            // @ts-ignore
            await sendWhatsapp(user.phone, subject);
        }
    }
}