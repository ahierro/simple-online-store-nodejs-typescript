import express from "express";
import asyncHandler from "express-async-handler";
import loginValidator from "../middlewares/loginValidator";
import {addProduct, checkout, create, deleteById, deleteProduct, getProductsById} from "../controllers/cartController";

const router = express.Router();

router.post('/', loginValidator, asyncHandler(create));
router.post('/checkout/:id', loginValidator, asyncHandler(checkout));
router.delete('/:id', loginValidator, asyncHandler(deleteById));
router.get('/:id/productos', loginValidator, asyncHandler(getProductsById));
router.post('/:id/productos', loginValidator, asyncHandler(addProduct));
router.delete('/:id/productos/:id_prod', loginValidator, asyncHandler(deleteProduct));

export default router