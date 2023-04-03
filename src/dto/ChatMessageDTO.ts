import {EntityDTO} from "./EntityDTO";
import {ChatMessageEntity} from "../persistence/model/mongo/ChatMessageEntity";
import {IsDefined, IsEmail, Length} from "class-validator";

export class ChatMessageDTO implements EntityDTO{
    id: string;
    @IsDefined()
    @Length(1, 100)
    @IsEmail()
    mail: string;
    @IsDefined()
    @Length(1, 100)
    content: string;
    @IsDefined()
    @Length(1, 100)
    type: string;
    @Length(1, 100)
    @IsDefined()
    room: string;
    timestamp: string;

    static from(data: ChatMessageEntity) : ChatMessageDTO {
        const product = new ChatMessageDTO();
        product.id = data._id;
        product.content = data.content;
        product.mail = data.mail;
        product.room = data.room;
        product.timestamp = data.timestamp;
        product.type = data.type;
        return product;
    }

    static to(data: ChatMessageDTO) : ChatMessageEntity {
        const product = new ChatMessageEntity();
        product._id = data.id;
        product.content = data.content;
        product.timestamp = data.timestamp;
        product.type = data.type;
        product.mail = data.mail;
        product.room = data.room;
        return product;
    }
}