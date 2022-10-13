const Container = require('../container/container');
const express = require('express');

const router = express.Router();
const container = new Container();

router.get('/', async (req, res) => {
    res.json(await container.getAll());
});

router.get('/:id', async (req, res) => {
    res.json(await container.getById(req.params.id));
});

router.post('/', async (req, res) => {
    res.status(201).json(await container.insert(req.body));
});

router.put('/:id', async (req, res) => {
    res.json(await container.update(req.params.id, req.body));
});

router.delete('/:id', async (req, res) => {
    res.json(await container.deleteById(req.params.id));
});

module.exports = router