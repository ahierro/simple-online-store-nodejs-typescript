export interface GenericDAO<T> {

    insert(obj: T): Promise<T>;

    update(id, obj: T): Promise<T>;

    getById(id): Promise<T>;

    getAll(): Promise<T[]>;

    deleteById(id): Promise<T>;

}