const {v4: uuidv4} = require('uuid');
require('express-async-errors');

const knex = require('knex');

module.exports = class Container {
    #tableName;
    #knex;

    constructor(tableName,db) {
        this.#tableName = tableName ;
        this.#knex = knex(db)
    }

    async insert(obj) {
        const newObj = {...obj,id:uuidv4()};
        await this.#knex(this.#tableName).insert(newObj);
        return newObj;
    }

    async getAll() {
        return this.#knex(this.#tableName)
            .select('*')
    }

}