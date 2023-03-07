import {CartAPI} from "../api/cartAPI";
import {Context, Next} from "koa";

export const create = async (ctx: Context, next: Next) => {
    ctx.body = await CartAPI.getInstance().create(ctx.request.body);
    ctx.status = 201;
    await next();
}

export const deleteById = async (ctx: Context, next: Next) => {
    await CartAPI.getInstance().deleteById(ctx.params.id);
    await next();
}

export const getProductsById = async (ctx: Context, next: Next) => {
    ctx.body = await CartAPI.getInstance().getProductsById(ctx.params.id);
    await next();
}

export const deleteProduct = async (ctx: Context, next: Next) => {
    await CartAPI.getInstance().deleteProduct(ctx.params.id, ctx.params.id_prod);
    await next();
}

export const addProduct = async (ctx: Context, next: Next) => {
    ctx.body = await CartAPI.getInstance().addProduct(ctx.params.id, ctx.request.body.id, ctx.request.body.quantity);
    ctx.status = 201;
    await next();
}

export const checkout = async (ctx: Context, next: Next) => {
    await CartAPI.getInstance().checkout(ctx.params.id, ctx.user);
    ctx.status = 201;
    await next();
}