const fs = require('fs');

class Container {
    #fileName;

    constructor(filename) {
        this.#fileName = filename ?? "productos.txt";
    }

    async save(obj) {
        if(!obj || !obj.title || !obj.price || !obj.thumbnail){
            throw new Error("Objeto Invalido");
        }
        const list = await this.getAll();
        list.push({...obj,id:(list?.at(-1)?.id ?? 0) + 1});
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
        const index = list.findIndex(obj => obj.id === id);
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

(async () => {
    try {
        const container = new Container();
        const escuadra = {
                title: 'Escuadra',
                price: 123.45,
                thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png',
                id: 1
            }
        ;
        const calculadora = {
                title: 'Calculadora',
                price: 234.56,
                thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png',
                id: 2
            }
        ;
        const globoTerraqueo = {
                title: 'Globo Terráqueo',
                price: 345.67,
                thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png',
                id: 3
            }
        ;

        await container.save(escuadra);
        console.log("container.save(escuadra)");
        await container.save(calculadora);
        console.log("container.save(calculadora)");
        await container.save(globoTerraqueo);
        console.log("container.save(globoTerraqueo)");

        console.log("container.getAll()", await container.getAll());
        console.log("container.getById(2)", await container.getById(2));
        await container.deleteById(2);
        console.log("container.deleteById(2)");

        console.log("container.getAll()", await container.getAll());
        await container.deleteAll();
        console.log("container.deleteAll()");
        console.log("container.getAll()", await container.getAll());
        console.log("container.getById(2)", await container.getById(2));

        console.log("container.deleteById(2)");
        await container.deleteById(2);
    } catch (err) {
        console.log(err);
    }
})()




