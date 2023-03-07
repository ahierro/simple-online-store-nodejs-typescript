import {ProductAPI} from "../api/productAPI";
import {Context, Next} from "koa";

export const getAll = async (ctx: Context, next: Next) => {
    ctx.body = await ProductAPI.getInstance().getAll();
    await next();
}

export const getById = async (ctx: Context, next: Next) => {
    ctx.body = await ProductAPI.getInstance().getById(ctx.params.id);
    await next();
}

export const create = async (ctx: Context, next: Next) => {
    ctx.body = await ProductAPI.getInstance().create(ctx.request.body);
    ctx.status = 201;
    await next();
}

export const update = async (ctx: Context, next: Next) => {
    await ProductAPI.getInstance().update(ctx.params.id, ctx.request.body);
    await next();
}

export const deleteById = async (ctx: Context, next: Next) => {
    await ProductAPI.getInstance().deleteById(ctx.params.id);
    await next();
}