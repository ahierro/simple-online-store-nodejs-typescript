const Container = require('../container/container');
const express = require('express');
const ApiError = require("../exceptions/ApiError");

const router = express.Router();
const productContainer = new Container("productos.json",(obj)=>{
        if(!obj || !obj.title || !obj.price || !obj.thumbnail || !obj.description || !obj.timestamp || !obj.code || !obj.stock){
            throw new ApiError({status:400,message:"Objeto Invalido. No tiene los campos requeridos"});
        }
},"Producto");

router.get('/', async (req, res) => {
    res.json(await productContainer.getAll());
});

router.get('/:id', async (req, res) => {
    res.json(await productContainer.getById(req.params.id));
});

router.post('/', async (req, res) => {
    const product = req.body;
    product.timestamp = new Date().toISOString();
    res.status(201).json(await productContainer.insert(product));
});

router.put('/:id', async (req, res) => {
    await productContainer.update(req.params.id, req.body);
    res.status(200).json();
});

router.delete('/:id', async (req, res) => {
    await productContainer.deleteById(req.params.id);
    res.status(200).json();
});

module.exports = router