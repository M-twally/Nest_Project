import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { User } from './user.schema';
import { Wallet } from './wallet.schema';

export type TransactionDocument = mongoose.HydratedDocument<Transaction>;

@Schema({ timestamps: true })
export class Transaction {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    user: User;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Wallet' })
    wallet: Wallet;

    @Prop({ type: [String], default: [] })
    history: string[];

    @Prop({})
    title: string;

}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
export const TransactionRegisterSchema = MongooseModule.forFeature([{ name: Transaction.name, schema: TransactionSchema }]);
