import fs from "fs";

export class Container {
    #fileName;

    constructor(filename) {
        this.#fileName = filename ?? "productos.json";
    }

    async save(obj) {
        if(!obj || !obj.title || !obj.price || !obj.thumbnail){
            throw new Error("Objeto Invalido");
        }
        const list = await this.getAll();
        list?.push({...obj,id:(list?.at(-1)?.id ?? 0) + 1});
        await this.#write(list);
        return obj.id;
    }

    async getById(id) {
        const list = await this.getAll();
        return list.find(obj => obj.id === id) || null;
    }

    async getAll() {
        try {
            const file = await fs.promises.readFile(this.#fileName, 'utf-8')
            return JSON.parse(file);
        }catch (err){
            if(err.code === "ENOENT"){
                await this.#write([]);
                return [];
            }else{
                throw err;
            }
        }
    }

    async deleteById(id) {
        const list = await this.getAll();
        const index = list?.findIndex(obj => obj.id === id);
        if(index<0){
            throw new Error("Id no encontrado");
        }
        list.splice(index, 1);
        await this.#write(list);
    }

    async deleteAll() {
        await this.#write([]);
    }

    async #write(list) {
        await fs.promises.writeFile(this.#fileName, JSON.stringify(list,null,'\t'));
    }
}
