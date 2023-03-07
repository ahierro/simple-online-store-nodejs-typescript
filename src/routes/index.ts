import Router from 'koa-router';
import routerProducts from "./product";
// import routerSession from "./session";

import routerCart from "./cart";

const router = new Router({
    prefix: '/api',
});

router.use(routerProducts);
router.use(routerCart);
// router.use( routerSession);

export default router.routes();