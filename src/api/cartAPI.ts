import {cartService} from "../services/cartService";
import {plainToClassFromExist} from "class-transformer";
import {CartDTO} from "../dto/CartDTO";
import {productService} from "../services/productService";
import {UtilService} from "../services/utilService";
import {sendMail} from "../services/emailService";
import {sendSms, sendWhatsapp} from "../services/twilioService";
import {header} from "../templates/mail/header";
import {rowsGenerate} from "../templates/mail/rows";
import {footer} from "../templates/mail/footer";

export class CartAPI {

    async create(requestBody) {
        return await cartService.insert(plainToClassFromExist(new CartDTO(), requestBody));
    }

    async deleteById(id) {
        return await cartService.deleteById(id);
    }

    async getProductsById(id) {
        const cart = await cartService.getById(id);
        cart?.products?.forEach(p => {
            p.timestampCarrito = cart.timestamp;
        })
        return cart.products;
    }

    async addProduct(idCart, idProd, quantity) {
        const cart = await cartService.getById(idCart);
        if (cart?.products) {
            const product = await productService.getById(idProd);
            UtilService.insertOrUpdateById(cart.products,
                {
                    ...product._doc,
                    quantity: quantity,
                    timestampProducto: product.timestamp,
                    timestamp: undefined,
                    _id: product._doc._id.toString()
                })
        }
        return await cartService.update(idCart, cart);
    }

    async deleteProduct(idCart, idProd) {
        const cart = await cartService.getById(idCart);
        if (cart && cart.products) {
            cart.products = cart.products.filter(p => p._id.toString() !== idProd);
        }
        return await cartService.update(idCart, cart);
    }

    async checkout(id,user) {
        const cart = (await cartService.getById(id));
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