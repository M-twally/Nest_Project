import { IsEmail, IsNotEmpty, IsString, IsStrongPassword, IsIn } from "class-validator";



export class SignUpDto{
    
    @IsNotEmpty()
    @IsString()
    name:string;

    @IsEmail()
    email:string;

    @IsStrongPassword()
    password:string;

    @IsNotEmpty()
    @IsString()
    @IsIn(['male', 'female'], { message: 'Gender must be either male or female' })
    gender:string


    @IsString()
    cpassword:string


}

export class SignInDto{

    @IsEmail()
    email:string;

    @IsStrongPassword()
    password:string;


}