import {EntityDTO} from "../dto/EntityDTO";
import {validateObj} from "./requestValidationService";
import {ApiError} from "../exceptions/ApiError";
import {GenericDAO} from "../container/genericDAO";

export class GenericService<T extends EntityDTO> {

    constructor(private dao: GenericDAO<T>) {
    }

    validateFields(obj: T) {
        validateObj(obj);
    }

    async insert(obj: T) {
        this.validateFields(obj);
        return this.dao.insert(obj);
    }

    async update(id, obj: T) {
        this.validateFields(obj);
        if (obj._id && obj._id.toString() !== id) {
            throw new ApiError({status: 400, message: "El id del body no coincide con el parametro"});
        }
        return this.dao.update(id,obj);
    }

    async getById(id) {
        return this.dao.getById(id);
    }

    async getAll() {
        return this.dao.getAll();
    }

    async deleteById(id) {
        return this.dao.deleteById(id);
    }

}