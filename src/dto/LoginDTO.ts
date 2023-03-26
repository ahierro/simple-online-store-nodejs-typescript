import {IsDefined, MinLength} from "class-validator";

export class LoginDTO {
    @MinLength(1)
    @IsDefined()
    username: string;
    @MinLength(1)
    @IsDefined()
    password: string;
}