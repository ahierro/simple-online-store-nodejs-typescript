import {ProductAPI} from "../api/productAPI";

const productAPI = new ProductAPI();

export const getAll = async (req, res) => {
    res.json(await productAPI.getAll());
}

export const getById = async (req, res) => {
    res.json(await productAPI.getById(req.params.id));
}

export const create = async (req, res) => {
    res.status(201).json(await productAPI.create(req.body));
}

export const update = async (req, res) => {
    await productAPI.update(req.params.id,req.body);
    res.status(200).json();
}

export const deleteById = async (req, res) => {
    await productAPI.deleteById(req.params.id);
    res.status(200).json();
}