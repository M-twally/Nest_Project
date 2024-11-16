import { Module } from "@nestjs/common";
import { userRegisterSchema } from "src/schema/user.schema";
import { walletRegisterSchema } from "src/schema/wallet.schema";
import { TransactionController } from "./transaction.controller";
import { TransactionDbService } from "./transaction.db.service";
import { TransactionService } from "./transaction.service";




@Module({
    
    imports:[userRegisterSchema,walletRegisterSchema],
    controllers: [TransactionController],
    providers: [TransactionDbService,TransactionService]
})

export class TransactionModule{}