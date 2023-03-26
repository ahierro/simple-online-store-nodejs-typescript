import {ProductAPI} from "../api/productAPI";

export const getAll = async (req, res) => {
    res.json(await ProductAPI.getInstance().getAll(req.query.category));
}

export const getById = async (req, res) => {
    res.json(await ProductAPI.getInstance().getById(req.params.id));
}

export const create = async (req, res) => {
    res.status(201).json(await ProductAPI.getInstance().create(req.body));
}

export const update = async (req, res) => {
    await ProductAPI.getInstance().update(req.params.id,req.body);
    res.status(200).json();
}

export const deleteById = async (req, res) => {
    await ProductAPI.getInstance().deleteById(req.params.id);
    res.status(200).json();
}