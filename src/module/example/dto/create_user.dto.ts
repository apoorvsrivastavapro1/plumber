import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateNewUserDTO {
    @IsNotEmpty()
    @IsString()
    username: string;

    @IsOptional()
    @IsString()
    @IsEmail()
    email?: string;

    @IsNotEmpty()
    @IsString()
    password: string;
}
