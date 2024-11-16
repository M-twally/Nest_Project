import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller"; 
import { AuthService } from "./auth.service";
import { AuthDbService } from "./auth.db.service";
import { userRegisterSchema } from "src/schema/user.schema";
import { JwtService } from "@nestjs/jwt";

@Module({
    imports:[userRegisterSchema],
    controllers:[AuthController],
    providers:[AuthService,AuthDbService,JwtService]
})


export class AuthModule{}