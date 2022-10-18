const {v4: uuidv4} = require('uuid');
require('express-async-errors');
const ApiError = require('../exceptions/ApiError');

module.exports = class Container {
    #list = [
        {
            "title": "Escuadra",
            "price": 123.45,
            "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
            "id": "faab7381-85cb-4f41-b158-49a13a56953b"
        },
        {
            "title": "Calculadora",
            "price": 234.56,
            "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png",
            "id": "4daeba96-e2b0-4eb0-a6c7-258fe968d298"
        },
        {
            "title": "Globo Terráqueo",
            "price": 345.67,
            "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png",
            "id": "952f507b-b427-48c7-9742-14d91da11bf2"
        }
    ];

    constructor(filename) {
    }

    validate(obj){
        if(!obj || !obj.title || !obj.price || !obj.thumbnail){
            throw new ApiError({status:400,message:"Objeto Invalido. No tiene los campos requeridos"});
        }
    }

    async insert(obj) {
        this.validate(obj);
        const list = await this.getAll();
        const newObj = {...obj,id:uuidv4()};
        list?.push(newObj);
        return newObj;
    }

    async update(id,obj) {
        this.validate(obj);
        if(obj.id && obj.id !== id){
            throw new ApiError({status:400,message:"El id del body no coincide con el parametro"});
        }
        const list = await this.getAll();
        const index = list?.findIndex(obj => obj.id === id);
        if(index<0){
            throw new ApiError({status:404,message:"Producto no encontrado"});
        }
        list[index] = {...obj,id};
        return list[index];
    }

    async getById(id) {
        const list = await this.getAll();
        const result = list.find(obj => obj.id === id);
        if(!result){
            throw new ApiError({status:404,message:"Producto no encontrado"})
        }
        return result;
    }

    async getAll() {
        return Promise.resolve(this.#list);
    }

    async deleteById(id) {
        const list = await this.getAll();
        const index = list?.findIndex(obj => obj.id === id);
        if(index<0){
            throw new ApiError({status:404,message:"Producto no encontrado"});
        }
        list.splice(index, 1);
    }

}