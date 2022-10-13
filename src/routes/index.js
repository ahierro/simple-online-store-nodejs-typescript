const express = require('express');
const routerProducts = require('./productos');

const router = express.Router();

router.use('/productos', routerProducts);

module.exports = router