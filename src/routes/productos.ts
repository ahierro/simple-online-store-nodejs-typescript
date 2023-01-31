import express from "express";
import adminGuard from "../middlewares/adminGuard";
import {ProductDTO} from "../model/ProductDTO";
import asyncHandler from "express-async-handler";
import productService from '../services/productService';
import productFakeService from '../services/productFakeService';
import loginValidator from "../services/loginValidator";

const router = express.Router();
const castProduct = (obj)=>{
    const product = new ProductDTO();
    Object.assign(product,obj);
    return product;
}
router.get('/', loginValidator, asyncHandler(async (req, res) => {
    res.json(await productService.getAll());
}));

router.get('/productos-test', asyncHandler(async (req, res) => {
    res.json(await productFakeService.getAll());
}));

router.get('/:id', loginValidator, asyncHandler(async (req, res) => {
    res.json(await productService.getById(req.params.id));
}));

router.post('/', adminGuard, asyncHandler(async (req, res) => {
    res.status(201).json(await productService.insert(castProduct(req.body)));
}));

router.put('/:id', adminGuard, asyncHandler(async (req, res) => {
    await productService.update(req.params.id, castProduct(req.body));
    res.status(200).json();
}));

router.delete('/:id', adminGuard, asyncHandler(async (req, res) => {
    await productService.deleteById(req.params.id);
    res.status(200).json();
}));

export default router