const fs = require('fs');

class ChatService {
    #fileName;

    constructor(filename) {
        this.#fileName = filename ?? "chat.txt";
    }

    async save(obj) {
        if(!obj || !obj.mail || !obj.content){
            throw new Error("Objeto Invalido");
        }
        const list = await this.getAll();
        list.push(obj);
        await this.#write(list);
        return obj.id;
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

    async #write(list) {
        await fs.promises.writeFile(this.#fileName, JSON.stringify(list,null,'\t'));
    }
}
const chatService = new ChatService();

module.exports = {
    chatService,
};
