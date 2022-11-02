const express = require('express');
const { productService } = require('../services/productService');
const { getWsServer } = require('../services/socket');

const router = express.Router();

router.get('/', async (req, res) => {
    res.render('productos',{productos: await productService.getAll()});
});
router.post('/', async (req, res) => {
    const newProduct = await productService.insert(req.body);
    getWsServer().emit('newProduct',newProduct);
    res.status(201).json(newProduct);
});

module.exports = router