import {GenericService} from "./genericService";
import {ChatMessageDTO} from "../dto/ChatMessageDTO";
import {ChatMessageRepository} from "../persistence/repository/chatMessageRepository";

export class ChatService extends GenericService<ChatMessageDTO> {
    private static instance: ChatService;

    static getInstance(): ChatService {
        if (!this.instance) {
            ChatService.instance = new ChatService();
        }
        return ChatService.instance;
    }

    private constructor() {
        super(ChatMessageRepository.getInstance());
    }
}