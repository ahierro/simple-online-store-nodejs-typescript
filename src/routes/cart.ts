import express from "express";
import {CartDTO} from "../model/CartDTO";
import asyncHandler from "express-async-handler";

const router = express.Router();
import productService from '../services/productService';
import cartService from '../services/cartService';
import {UtilService} from '../services/utilService';

const castCart = (obj)=>{
    const cart = new CartDTO();
    Object.assign(cart,obj);
    return cart;
}
router.post('/', asyncHandler(async (req, res) => {
    const cart = req.body;
    res.status(201).json(await cartService.insert(castCart(cart)));
}));

router.delete('/:id', asyncHandler(async (req, res) => {
    await cartService.deleteById(req.params.id);
    res.status(200).json();
}));

router.get('/:id/productos', asyncHandler(async (req, res) => {
    const cart = (await cartService.getById(req.params.id));
    cart?.products?.forEach(p => {
        p.timestampCarrito = cart.timestamp;
    })
    res.json(cart?.products);
}));

router.post('/:id/productos', asyncHandler(async (req, res) => {
    const cart = await cartService.getById(req.params.id);
    if(cart?.products){
        const product = await productService.getById(req.body.id);
        UtilService.insertOrUpdateById(cart.products,
            {...product._doc,quantity:req.body.quantity,timestampProducto:product.timestamp,timestamp:undefined,_id:product._doc._id.toString()})
    }
    res.status(201).json(await cartService.update(req.params.id,cart));
}));

router.delete('/:id/productos/:id_prod', asyncHandler(async (req, res) => {
    const cart = await cartService.getById(req.params.id);
    if(cart && cart.products){
        cart.products = cart.products.filter(p => p._id.toString() !== req.params.id_prod);
    }
    await cartService.update(req.params.id,cart);
    res.status(200).json();
}));


export default router