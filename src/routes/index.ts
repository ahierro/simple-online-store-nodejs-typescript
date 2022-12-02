import express from "express";

import routerProducts from "./productos";
import routerProductsFake from "./productosFake";
import messages from "./messages";

import routerCart from "./cart";

const router = express.Router();

router.use('/productos', routerProducts);
router.use('/carrito', routerCart);
router.use('/productos-test', routerProductsFake);
router.use('/messages', messages);

export default router