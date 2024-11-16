import { Module } from "@nestjs/common";
import { WalletController } from "./wallet.controller";
import { WalletService } from "./wallet.service";
import { WalletDbService } from "./wallet.db.service";
import { walletRegisterSchema } from "src/schema/wallet.schema";
import { JwtService } from "@nestjs/jwt";
import { AuthService } from "../auth/auth.service";
import { AuthDbService } from "../auth/auth.db.service";
import { userRegisterSchema } from "src/schema/user.schema";
import { TransactionDbService } from "../Transaction/transaction.db.service";
import { TransactionRegisterSchema } from "src/schema/transaction.schema";





@Module({
    imports:[walletRegisterSchema,userRegisterSchema,TransactionRegisterSchema],
    controllers:[WalletController],
    providers:[WalletService,WalletDbService,AuthDbService,JwtService,TransactionDbService],
})


export class WalletModule{}