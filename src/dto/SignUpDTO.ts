import {IsDefined, IsEmail, IsPhoneNumber, IsUrl, Max, Min, MinLength} from "class-validator";

export class SignUpDTO {
    @MinLength(4)
    @IsDefined()
    username: string;
    @MinLength(8)
    @IsDefined()
    password: string;
    @IsEmail()
    @IsDefined()
    email: string;
    @IsDefined()
    firstName: string;
    @IsDefined()
    lastName: string;
    admin: boolean = false
    @Min(18)
    @Max(120)
    @IsDefined()
    age: number;
    @IsDefined()
    @IsPhoneNumber()
    phone: string;
    @IsUrl()
    avatarURL: string;
    address: string;
}