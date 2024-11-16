import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "src/schema/user.schema";





export class UserDbService {

@InjectModel(User.name) private userModel:Model <User>

async findOneAndUpdate(email: string, updateData: { code: string }): Promise<User> {
    const user = await this.userModel.findOneAndUpdate(
      { email },
      { 
        code: updateData.code,     // Update the OTP code
        verified: true             // Update verified field to true
      },
      { new: true } // Returns the updated document
    );
    return user;
  }




}
