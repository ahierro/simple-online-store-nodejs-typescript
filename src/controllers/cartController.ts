import {CartAPI} from "../api/cartAPI";

export const create = async (req, res) => {
    res.status(201).json(await CartAPI.getInstance().create(req.body));
}

export const deleteById = async (req, res) => {
    await CartAPI.getInstance().deleteById(req.params.id);
    res.status(200).json();
}

export const getProductsById = async (req, res) => {
    res.json(await CartAPI.getInstance().getProductsById(req.params.id));
}

export const deleteProduct = async (req, res) => {
    await CartAPI.getInstance().deleteProduct(req.params.id, req.params.id_prod);
    res.status(200).json();
}

export const addProduct = async (req, res) => {
    res.status(201).json(await CartAPI.getInstance().addProduct(req.params.id, req.body.id, req.body.quantity));
}

export const checkout = async (req, res) => {
    await CartAPI.getInstance().checkout(req.params.id, req.user);
    res.status(201).json({});
}