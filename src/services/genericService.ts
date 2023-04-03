import {EntityDTO} from "../dto/EntityDTO";
import {validateObj} from "./requestValidationService";
import {ApiError} from "../exceptions/ApiError";
import {GenericRepository} from "../persistence/repository/genericRepository";

export class GenericService<T extends EntityDTO> {

    constructor(protected repository: GenericRepository<T>) {
    }

    validateFields(obj: T) {
        validateObj(obj);
    }

    async insert(obj: T) {
        this.validateFields(obj);
        return await this.repository.insert(obj);
    }

    async update(id, obj: T) {
        this.validateFields(obj);
        if (obj.id && obj.id.toString() !== id) {
            throw new ApiError({status: 400, message: "El id del body no coincide con el parametro"});
        }
        return await this.repository.update(id,obj);
    }

    async getById(id) {
        return await this.repository.getById(id);
    }

    async getAll() {
        return await this.repository.getAll();
    }

    async deleteById(id) {
        return await this.repository.deleteById(id);
    }

    async getAllByFilters(filters): Promise<T[]>{
        return await this.repository.getAllByFilters(filters);
    }

}