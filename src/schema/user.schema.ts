
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true ,lowercase: true})
  name: string;

  @Prop({required:true,})
  password: string;

  @Prop({required:true,unique:true})
  email: string;
  
  @Prop({required:true,enum:["male","female"]})
  gender: string;

  @Prop({default:false})
  verified: boolean;
  
  @Prop({default:"user",enum:["user","admin"]})
  role: string;
  @Prop({default:"0000"})
  code: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
export const userRegisterSchema = MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]);
