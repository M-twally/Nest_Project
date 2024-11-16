import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { AuthDbService } from "../auth/auth.db.service";
import { JwtService } from "@nestjs/jwt";
import { userRegisterSchema } from "src/schema/user.schema";
import { UserService } from "./user.service";
import { MailService } from "src/Mail/mail/mail.service";
import { UserDbService } from "./user.db.service";
import {  walletRegisterSchema } from "src/schema/wallet.schema";
import {  TransactionRegisterSchema } from "src/schema/transaction.schema";
import { TransactionDbService } from "../Transaction/transaction.db.service";
import { WalletDbService } from "../Wallet/wallet.db.service";





@Module({
    imports: [userRegisterSchema,walletRegisterSchema,TransactionRegisterSchema],
    controllers: [UserController],
    providers: [UserService,AuthDbService,JwtService,MailService,UserDbService,TransactionDbService ,WalletDbService],
})

export class UserModule{}