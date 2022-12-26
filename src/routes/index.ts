import express from "express";

import routerProducts from "./productos";
import routerProductsFake from "./productosFake";
import messages from "./messages";
import session from "./session";
import info from "./info";
import randoms from "./randoms";

import routerCart from "./cart";

const router = express.Router();

router.use('/productos', routerProducts);
router.use('/carrito', routerCart);
router.use('/productos-test', routerProductsFake);
router.use('/messages', messages);
router.use('/session', session);
router.use('/info', info);
router.use('/randoms', randoms);

export default router