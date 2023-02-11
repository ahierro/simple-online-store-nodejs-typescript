import {ApiError} from "../../exceptions/ApiError";
import mongoose from 'mongoose';
import {GenericDAO} from "./genericDAO";

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
            return result._doc;
        });
    }

    async getAll() {
        return this.collection.find();
    }

    async deleteById(id) {
        return await this.doAction(async () => await this.collection.findByIdAndDelete(id));
    }

    private async doAction(action) {
        let result = null;
        try {
            result = await action();
        } catch (e) {
            throw new ApiError({status: 500, message: `${e.reason}`});
        }
        if (!result) {
            throw new ApiError({status: 404, message: `${this.name} no encontrado`});
        }
        return result;
    }

}