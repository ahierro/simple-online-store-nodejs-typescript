import {ApiError} from "../exceptions/ApiError";
import {Entity} from "../model/Entity";
import {validateSync} from 'class-validator';

export class MongoContainer<T extends Entity> {

    constructor(private name: string, private collection: any) {
    }

    validateFields(obj: T) {
        const errors = validateSync(obj, {skipMissingProperties: false});
        if (errors.length > 0) {
            throw new ApiError({
                status: 400,
                message: errors.map(e => Object.values(e.constraints).join(",")).join("; ")
            });
        }
    }

    async insert(obj: T) {
        this.validateFields(obj);
        const newObj = {...obj, timestamp: new Date().toISOString()};
        return this.doAction(()=>this.collection.create(newObj));
    }

    async update(id, obj: T) {
        this.validateFields(obj);
        if (obj._id && obj._id.toString() !== id) {
            throw new ApiError({status: 400, message: "El id del body no coincide con el parametro"});
        }
        return this.doAction(()=>this.collection.findByIdAndUpdate(id,obj,{new:true}));
    }

    async getById(id) {
        return this.doAction(()=>this.collection.findById(id));
    }

    async getAll() {
        return this.collection.find();
    }

    async deleteById(id) {
        return this.doAction(()=>this.collection.findByIdAndDelete(id));
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