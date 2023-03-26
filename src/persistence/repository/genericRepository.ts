import {EntityDTO} from "../../dto/EntityDTO";

export interface GenericRepository<T extends EntityDTO> {

    insert(obj: T): Promise<T>;

    update(id, obj: T): Promise<T>;

    getById(id): Promise<T>;

    getAll(): Promise<T[]>;

    getAllByFilters(filters): Promise<T[]>;

    deleteById(id): Promise<T>;

}