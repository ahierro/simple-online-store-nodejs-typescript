import express from "express";

import routerProducts from "./product";
import routerSession from "./session";
import info from "./info";

import routerCart from "./cart";

const router = express.Router();

router.use('/product', routerProducts);
router.use('/cart', routerCart);
router.use('/session', routerSession);
router.use('/info', info);

export default router