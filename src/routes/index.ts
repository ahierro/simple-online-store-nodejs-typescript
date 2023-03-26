import express from "express";

import routerProducts from "./product";
import routerSession from "./session";

import routerCart from "./cart";

const router = express.Router();

router.use('/product', routerProducts);
router.use('/cart', routerCart);
router.use('/session', routerSession);

export default router