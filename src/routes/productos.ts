import {Container} from "../container/container";
import express from "express";
import adminGuard from "../middlewares/adminGuard";
import {ProductDTO} from "../model/ProductDTO";
import asyncHandler from "express-async-handler";

const router = express.Router();
const productContainer = new Container<ProductDTO>("productos.json", "Producto");
const castProduct = (obj)=>{
    const product = new ProductDTO();
    Object.assign(product,obj);
    return product;
}
router.get('/', asyncHandler(async (req, res) => {
    res.json(await productContainer.getAll());
}));

router.get('/:id', asyncHandler(async (req, res) => {
    res.json(await productContainer.getById(req.params.id));
}));

router.post('/', adminGuard, asyncHandler(async (req, res) => {
    res.status(201).json(await productContainer.insert(castProduct(req.body)));
}));

router.put('/:id', adminGuard, asyncHandler(async (req, res) => {
    await productContainer.update(req.params.id, castProduct(req.body));
    res.status(200).json();
}));

router.delete('/:id', adminGuard, asyncHandler(async (req, res) => {
    await productContainer.deleteById(req.params.id);
    res.status(200).json();
}));

export default router