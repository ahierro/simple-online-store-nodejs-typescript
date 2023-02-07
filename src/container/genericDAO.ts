import {ApiError} from "../exceptions/ApiError";
import {EntityDTO} from "../dto/EntityDTO";

export class GenericDAO<T extends EntityDTO> {

    constructor(private name: string, private collection: any) {
    }

    async insert(obj: T) {
        const newObj = {...obj, timestamp: new Date().toISOString()};
        return this.doAction(()=>this.collection.create(newObj));
    }

    async update(id, obj: T) {
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