import { IsEmail } from "class-validator"

export { IsEmail, IsString, MinLength } from "class-validator"

export class LoginUserDto{
    @IsString()
    @IsEmail()
    
}