const express = require('express');
const routerProducts = require('./productos');
const routerCart = require('./cart');

const router = express.Router();

router.use('/productos', routerProducts);
router.use('/carrito', routerCart);

module.exports = router