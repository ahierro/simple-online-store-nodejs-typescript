import Router from 'koa-router';

import {create, deleteById, getAll, getById, update} from "../controllers/productController";

const router = new Router({
    prefix: '/productos',
});

router.get('/',  getAll);
router.get('/:id', getById);
router.post('/', create);
router.put('/:id', update);
router.delete('/:id',  deleteById);

export default router.routes();