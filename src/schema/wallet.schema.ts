import { MongooseModule, Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from 'mongoose'
import { User, UserSchema } from "./user.schema";



export type WalletDocument = mongoose.HydratedDocument<Wallet>;

@Schema({ timestamps: true })

@Schema()
export class Wallet {
    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'User'})
    owner:User

    @Prop({default:0})
    balance:number

    @Prop({default:0})
    limit:number




}

export const  WalletSchema=SchemaFactory.createForClass(Wallet)
export const walletRegisterSchema = MongooseModule.forFeature([{ name: Wallet.name, schema: WalletSchema }]);