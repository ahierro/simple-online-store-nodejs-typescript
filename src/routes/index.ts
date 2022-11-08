import express from "express";

import routerProducts from "./productos";

import routerCart from "./cart";

const router = express.Router();

router.use('/productos', routerProducts);
router.use('/carrito', routerCart);

export default router