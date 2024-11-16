import { BadRequestException, Injectable } from "@nestjs/common";
import { AuthDbService } from "./auth.db.service";
import { SignInDto, SignUpDto } from "./validation/auth.dto";
import * as bcrypt from 'bcrypt';
import { JsonWebTokenError, JwtService } from "@nestjs/jwt";
import { json } from "express";



@Injectable()

export class AuthService {
    constructor(private _AuthDbService:AuthDbService,private _JwtService: JwtService){}  
        

    async signUp(data:SignUpDto){
        console.log(data);
        
        const {name,email,password,gender}=data
        const check=await this._AuthDbService.findByEmail(email)
        console.log(check);
        

        if(check){
            throw new BadRequestException("email already exist")
        }
        const hashedPassword= bcrypt.hashSync(password,10)
        const user=await this._AuthDbService.createUser({name,email,password:hashedPassword,gender})
        return {
            Msg:"user created successfully",
            user
        }

    }


    async signIn(data:SignInDto){
        const {email,password}=data
        const user=await this._AuthDbService.findByEmail(email)
        if(!user){
            throw new BadRequestException("email not found")
        }
        const check=bcrypt.compareSync(password,user.password)
        if(!check){
            throw new BadRequestException("password is incorrect")
        }
        const token=this._JwtService.sign({email:user.email,userId:user["_id"]},{secret:"Lol",expiresIn:"1d"})

        return {
            Msg:"user logged in successfully",
            token
        }


}

}