import express from "express";
import {CartDTO} from "../model/CartDTO";
import asyncHandler from "express-async-handler";

const router = express.Router();
import productService from '../services/productService';
import cartService from '../services/cartService';
import {UtilService} from '../services/utilService';
import {sendMail} from "../services/email.service";
import loginValidator from "../services/loginValidator";
import {sendSms, sendWhatsapp} from "../services/twilioService";

const castCart = (obj) => {
    const cart = new CartDTO();
    Object.assign(cart, obj);
    return cart;
}
router.post('/', loginValidator, asyncHandler(async (req, res) => {
    const cart = req.body;
    res.status(201).json(await cartService.insert(castCart(cart)));
}));

router.post('/checkout/:id', loginValidator, asyncHandler(async (req, res) => {
    const cart = (await cartService.getById(req.params.id));
    if (cart) {
        const header =
            `<table = style="border: 1px solid black">
  <tr>
    <th style="border: 1px solid black">Producto</th>
    <th style="border: 1px solid black">Cantidad</th>
  </tr>`;
        const rows = cart.products.map(p => {
            return `<tr>
                        <td style="border: 1px solid black">${p.title}</td>
                        <td style="border: 1px solid black">${p.quantity}</td>
                      </tr>`
        }).join("");
        const footer = "</table>";
        // @ts-ignore
        const subject = `nuevo pedido de ${req.user.username}  ${req.user.email} `;
        await sendMail(subject , header+rows+footer);
        // @ts-ignore
        await sendSms(req.user.phone, "Su pedido ha sido recibido y se encuentra en proceso");
        // @ts-ignore
        await sendWhatsapp(req.user.phone, subject);

    }

    res.status(201).json({});
}));

router.delete('/:id', loginValidator, asyncHandler(async (req, res) => {
    await cartService.deleteById(req.params.id);
    res.status(200).json();
}));

router.get('/:id/productos', loginValidator, asyncHandler(async (req, res) => {
    const cart = (await cartService.getById(req.params.id));
    cart?.products?.forEach(p => {
        p.timestampCarrito = cart.timestamp;
    })
    res.json(cart?.products);
}));

router.post('/:id/productos', loginValidator, asyncHandler(async (req, res) => {
    const cart = await cartService.getById(req.params.id);
    if (cart?.products) {
        const product = await productService.getById(req.body.id);
        UtilService.insertOrUpdateById(cart.products,
            {
                ...product._doc,
                quantity: req.body.quantity,
                timestampProducto: product.timestamp,
                timestamp: undefined,
                _id: product._doc._id.toString()
            })
    }
    res.status(201).json(await cartService.update(req.params.id, cart));
}));

router.delete('/:id/productos/:id_prod', loginValidator, asyncHandler(async (req, res) => {
    const cart = await cartService.getById(req.params.id);
    if (cart && cart.products) {
        cart.products = cart.products.filter(p => p._id.toString() !== req.params.id_prod);
    }
    await cartService.update(req.params.id, cart);
    res.status(200).json();
}));


export default router