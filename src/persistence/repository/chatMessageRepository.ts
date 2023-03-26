import {GenericRepository} from "./genericRepository";
import {ProductDTO} from "../../dto/ProductDTO";
import {chatMessageDAO, productDAO} from "../dao/factoryDAO";
import {GenericDAO} from "../dao/genericDAO";
import {ProductEntity} from "../model/mongo/ProductEntity";
import {ChatMessageDTO} from "../../dto/ChatMessageDTO";
import {ChatMessageEntity} from "../model/mongo/ChatMessageEntity";

export class ChatMessageRepository implements GenericRepository<ChatMessageDTO> {

    private static instance: ChatMessageRepository;

    static getInstance(): ChatMessageRepository {
        if (!this.instance) {
            ChatMessageRepository.instance = new ChatMessageRepository(chatMessageDAO());
        }

        return ChatMessageRepository.instance;
    }

    private constructor(private dao: GenericDAO<ChatMessageEntity>) {
    }

    async insert(obj: ChatMessageDTO) {
        return ChatMessageDTO.from(await this.dao.insert(ChatMessageDTO.to(obj)));
    }

    async update(id, obj: ChatMessageDTO) {
        return ChatMessageDTO.from(await this.dao.update(id, ChatMessageDTO.to(obj)));
    }

    async getById(id) {
        return ChatMessageDTO.from(await this.dao.getById(id));
    }

    async getAll() {
        return (await this.dao.getAll()).map(x => ChatMessageDTO.from(x));
    }

    async getAllByFilters() {
        return (await this.dao.getAll()).map(x => ChatMessageDTO.from(x));
    }

    async deleteById(id) {
        return ChatMessageDTO.from(await this.dao.deleteById(id));
    }

}