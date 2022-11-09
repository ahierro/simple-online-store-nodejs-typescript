import {Container} from "../container/container";

import express from "express";

import {ApiError} from "../exceptions/ApiError";
import {ProductDTO} from "../model/ProductDTO";
import {CartDTO} from "../model/CartDTO";

const router = express.Router();
const cartContainer = new Container<CartDTO>("cart.json",(obj)=>{
    if(!obj || !obj.products){
        throw new ApiError({status:400,message:"Objeto Invalido. No tiene los campos requeridos"});
    }
},"Carrito");
const productContainer = new Container<ProductDTO>("productos.json",()=>{},"Producto");
router.post('/', async (req, res) => {
    const cart = req.body;
    res.status(201).json(await cartContainer.insert(cart));
});

router.delete('/:id', async (req, res) => {
    await cartContainer.deleteById(req.params.id);
    res.status(200).json();
});

router.get('/:id/productos', async (req, res) => {
    const cart = (await cartContainer.getById(req.params.id));
    cart?.products?.forEach(p => {
        p.timestampCarrito = cart.timestamp;
    })
    res.json(cart?.products);
});

router.post('/:id/productos', async (req, res) => {
    const cart = await cartContainer.getById(req.params.id);
    if(cart?.products){
        const product = await productContainer.getById(req.body.id);
        product.timestampProducto = product.timestamp;
        product.quantity = req.body.quantity;
        product.timestamp = undefined;
        cartContainer.upsert(cart?.products,product)
    }
    res.status(201).json(await cartContainer.update(req.params.id,cart));
});

router.delete('/:id/productos/:id_prod', async (req, res) => {
    const cart = await cartContainer.getById(req.params.id);
    if(cart && cart.products){
        cart.products = cart?.products?.filter(p => p?.id !== req.params.id_prod);
    }
    await cartContainer.update(req.params.id,cart);
    res.status(200);
});

export default router