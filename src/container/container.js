const fs = require('fs');
const {v4: uuidv4} = require('uuid');
require('express-async-errors');
const ApiError = require('../exceptions/ApiError');

module.exports = class Container {
    #fileName;

    constructor(filename, validate, name) {
        this.#fileName = filename;
        this.validate = validate;
        this.name = name
    }

    upsert(originalList, newObj) {
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

    async insert(obj) {
        this.validate(obj);
        const list = await this.getAll();
        const newObj = {...obj, id: uuidv4()};
        list?.push(newObj);
        await this.#write(list);
        return newObj;
    }

    async update(id, obj) {
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
            const file = await fs.promises.readFile(this.#fileName, 'utf-8')
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
        await fs.promises.writeFile(this.#fileName, JSON.stringify(list, null, '\t'));
    }
}