import {CartAPI} from "../api/cartAPI";

const cartAPI = new CartAPI();

export const create = async (req, res) => {
    res.status(201).json(await cartAPI.create(req.body));
}

export const deleteById = async (req, res) => {
    await cartAPI.deleteById(req.params.id);
    res.status(200).json();
}

export const getProductsById = async (req, res) => {
    res.json(await cartAPI.getProductsById(req.params.id));
}

export const deleteProduct = async (req, res) => {
    await cartAPI.deleteProduct(req.params.id, req.params.id_prod);
    res.status(200).json();
}

export const addProduct = async (req, res) => {
    res.status(201).json(await cartAPI.addProduct(req.params.id, req.body.id, req.body.quantity));
}

export const checkout = async (req, res) => {
    await cartAPI.checkout(req.params.id, req.user);
    res.status(201).json({});
}