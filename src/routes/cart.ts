import express from "express";
import asyncHandler from "express-async-handler";
import loginValidator from "../middlewares/loginValidator";
import {addProduct, checkout, create, deleteById, deleteProduct, getProductsById} from "../controllers/cartController";

const router = express.Router();

router.post('/', loginValidator, asyncHandler(create));
router.post('/checkout/:id', loginValidator, asyncHandler(checkout));
router.delete('/:id', loginValidator, asyncHandler(deleteById));
router.get('/:id/product', loginValidator, asyncHandler(getProductsById));
router.post('/:id/product', loginValidator, asyncHandler(addProduct));
router.delete('/:id/product/:id_prod', loginValidator, asyncHandler(deleteProduct));

export default router