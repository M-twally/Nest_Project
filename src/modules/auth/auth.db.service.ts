import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "src/schema/user.schema";




export class AuthDbService {
    
    @InjectModel(User.name) private userModel:Model <User>

    async createUser(data:any):Promise<User>{
         const user= await this.userModel.create(data)
         return user

    }

    async findById(ID:string):Promise<User>{
        const user =await this.userModel.findById(ID)
        return user
    }

    async findByEmail(email:string):Promise<User>{
        console.log(email);
        
        const user =await this.userModel.findOne({email})
        return user
    }
}