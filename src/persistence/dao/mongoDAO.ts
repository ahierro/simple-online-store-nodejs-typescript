import {ApiError} from "../../exceptions/ApiError";
import mongoose from 'mongoose';
import {GenericDAO} from "./genericDAO";
import log4js from "log4js";
const logger = log4js.getLogger();

export class MongoDAO<T> implements GenericDAO<T>{

    constructor(private name: string, private collection: mongoose.Model<any, unknown, unknown>)  {
    }

    async insert(obj: T) {
        const newObj = {...obj, timestamp: new Date().toISOString()};
        return await this.doAction(async () => await this.collection.create(newObj));
    }

    async update(id, obj: T) {
        return await this.doAction(async () => await this.collection.findByIdAndUpdate(id, obj, {new: true}));
    }

    async getById(id) {
        return await this.doAction(async () => {
            let result = await this.collection.findById(id);
            return result?._doc;
        });
    }

    async getAll() {
        return this.collection.find().sort({timestamp: 1});
    }

    async getAllByFilters(filters): Promise<T[]>{
        return this.collection.find(filters).sort({timestamp: 1});
    }

    async deleteById(id) {
        return await this.doAction(async () => await this.collection.findByIdAndDelete(id));
    }

    private async doAction(action) {
        let result = null;
        try {
            result = await action();
        } catch (e) {
            logger.error(e);
            throw new ApiError({status: 500, message: `${e.reason}`});
        }
        if (!result) {
            throw new ApiError({status: 404, message: `${this.name} not found`});
        }
        return result;
    }

}