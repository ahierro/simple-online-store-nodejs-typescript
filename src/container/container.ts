import fs from "fs";
import {ApiError} from "../exceptions/ApiError";
import {v4 as uuidv4} from "uuid";
import {Entity} from "../model/Entity";

export class Container<T extends Entity> {

    constructor(private filename:string, private validate: (obj:T)=>void,private name:string) {
    }

    upsert(originalList:T[], newObj) {
        if (!newObj?.id) {
            throw new ApiError({status: 400, message: "El objeto debe contener un id"});
        }
        if (originalList) {
            const index = originalList?.findIndex(obj => obj.id === newObj.id);
            if (index < 0) {
                originalList.push(newObj);
            } else {
                originalList[index] = newObj;
            }
        }
    }

    async insert(obj:T) {
        const newObj = {...obj, id: uuidv4(),timestamp:new Date().toISOString()};
        this.validate(newObj);
        const list = await this.getAll();
        list?.push(newObj);
        await this.#write(list);
        return newObj;
    }

    async update(id, obj:T) {
        this.validate(obj);
        if (obj.id && obj.id !== id) {
            throw new ApiError({status: 400, message: "El id del body no coincide con el parametro"});
        }
        const list = await this.getAll();
        const index = list?.findIndex(obj => obj.id === id);
        if (index < 0) {
            throw new ApiError({status: 404, message: `${this.name} no encontrado`});
        }
        list[index] = {...obj, id};
        await this.#write(list);
        return list[index];
    }

    async getById(id) {
        const list = await this.getAll();
        const result = list.find(obj => obj.id === id);
        if (!result) {
            throw new ApiError({status: 404, message: `${this.name} no encontrado`})
        }
        return result;
    }

    async getAll() {
        try {
            const file = await fs.promises.readFile(this.filename, 'utf-8')
            return JSON.parse(file);
        } catch (err) {
            if (err.code === "ENOENT") {
                await this.#write([]);
                return [];
            } else {
                throw err;
            }
        }
    }

    async deleteById(id) {
        const list = await this.getAll();
        const index = list?.findIndex(obj => obj.id === id);
        if (index < 0) {
            throw new ApiError({status: 404, message: `${this.name} no encontrado`});
        }
        list.splice(index, 1);
        await this.#write(list);
    }

    async #write(list) {
        await fs.promises.writeFile(this.filename, JSON.stringify(list, null, '\t'));
    }
}