import express from "express";

import routerProducts from "./productos";
import routerProductsFake from "./productosFake";
import messages from "./messages";
import session from "./session";

import routerCart from "./cart";

const router = express.Router();

router.use('/productos', routerProducts);
router.use('/carrito', routerCart);
router.use('/productos-test', routerProductsFake);
router.use('/messages', messages);
router.use('/session', session);

export default router