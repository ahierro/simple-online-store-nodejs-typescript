const express = require('express');
const routerProducts = require('./productos');

const router = express.Router();

router.get('/', async (req, res) => {
    res.render('alta',{});
});

router.use('/productos', routerProducts);

module.exports = router