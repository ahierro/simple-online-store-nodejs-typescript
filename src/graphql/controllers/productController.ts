import {ProductAPI} from "../../api/productAPI";

export const getProducts = async () => {
    return await ProductAPI.getInstance().getAll();
}

export const getProductById = async ({id}) => {
    return await ProductAPI.getInstance().getById(id);
}

export const insertProduct = async ({product}) => {
    return await ProductAPI.getInstance().create(product);
}

export const updateProductById = async ({id,product}) => {
    return await ProductAPI.getInstance().update(id,product);
}

export const deleteProductById = async ({id}) => {
    await ProductAPI.getInstance().deleteById(id);
    return true;
}