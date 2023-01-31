import {IsEmail, MinLength, IsDefined, IsUrl, Max, Min, IsPhoneNumber} from "class-validator";

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
    name: string;
    address: string;
    @Min(18)
    @Max(120)
    @IsDefined()
    age: number;
    @IsDefined()
    @IsPhoneNumber()
    phone: string;
    @IsUrl()
    avatar: string;
}