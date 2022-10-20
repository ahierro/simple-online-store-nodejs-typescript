const Container = require('../container/container');
const express = require('express');

const router = express.Router();
const container = new Container();

router.get('/', async (req, res) => {
    res.render('listado',{productos: await container.getAll()});
});
router.post('/', async (req, res) => {
    await container.insert(req.body);
    res.redirect('/productos');
});

module.exports = router