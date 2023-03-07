import Router from 'koa-router';
import {addProduct, checkout, create, deleteById, deleteProduct, getProductsById} from "../controllers/cartController";

const router = new Router({
    prefix: '/carrito',
});

router.post('/',  create);
router.post('/checkout/:id',checkout);
router.delete('/:id', deleteById);
router.get('/:id/productos', getProductsById);
router.post('/:id/productos', addProduct);
router.delete('/:id/productos/:id_prod', deleteProduct);

export default router.routes();