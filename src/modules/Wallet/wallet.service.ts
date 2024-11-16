import { BadRequestException, Injectable } from "@nestjs/common";
import { WalletDbService } from "./wallet.db.service";
import { log } from "console";
import { TransactionDbService } from "../Transaction/transaction.db.service";







@Injectable()

export class WalletService {

    constructor(private _WalletDbService: WalletDbService, private _transactionDbService: TransactionDbService) { }


    async createWallet(request: any) {

        console.log(`create wallet called`);
        console.log(request[`user`]);
        const user = request[`user`][`name`];
        const id = request[`user`][`_id`]
        console.log(id);
        const check = await this._WalletDbService.findOne(id)
        if (check) {
            return new BadRequestException("wallet already exist")
        }
        const transaction = await this._transactionDbService.createTransaction({ user: id })
        const wallet = await this._WalletDbService.createWallet(id)

        return {
            Msg: `wallet created successfully ${user}`,
            wallet
        }

    }

    async Updatewallet(request: any, amount: number) {
        console.log(`update wallet called`);
        console.log(request[`user`]);
        const owner = request[`user`][`_id`]
        log(owner);
        const user = request[`user`][`name`];
        const wallet = await this._WalletDbService.findOne(owner)
        if (!wallet) {
            return new BadRequestException("wallet not found")

        }
        const walletId = (wallet as any)._id
        const get = await this._WalletDbService.GetBalance(owner)
        const newBalance = get.balance + amount
        const historyMessage = `wallet updated from ${get.balance} to ${newBalance}`;
      
        const transaction = await this._transactionDbService.findOneAndUpdate(
            owner,
            walletId,

            historyMessage
        );



        if (!transaction) {
            const createTransaction = await this._transactionDbService.createTransaction({ user: owner, wallet: walletId, history: `wallet updated from ${get.balance} to ${newBalance}` })

        }
        const check = await this._WalletDbService.findOneAndUpdate(owner, newBalance)
        if (!check) {
            return new BadRequestException("wallet not found")

        }
        return {
            Msg: `wallet updated successfully ${user}`,
            check
        }
    }

    async addLimit(request: any, limit: number) {
        console.log(`add limit called`);
        const user = request[`user`][`name`];
        const owner = request[`user`][`_id`]


        const check2 = await this._WalletDbService.GetBalance(owner)
        if (check2.balance < limit) {
            return new BadRequestException(`You donot have enough money`)

        }
        
        const check = await this._WalletDbService.findOneAndUpdateNew(owner, { limit: limit })
        if (!check) {
            return new BadRequestException("wallet not found")
        }
        const walletId = (check2 as any)._id
        const meassage = `limit changed from ${check2.limit} to ${limit}`
        const transaction=await this._transactionDbService.findOneAndUpdate(owner,walletId,meassage)
        return {
            Msg: `limit added successfully ${user}`,
            check
        }


    }

    async calculateBalance(request: any, amounts: number[]) {
        console.log(`calculate balance called`);
        const user = request[`user`][`name`];
        const owner = request[`user`][`_id`]
        const limit = await this._WalletDbService.GetBalance(owner)
        if (limit.limit < amounts.reduce((acc, amount) => acc + amount, 0)) {
            return new BadRequestException(`You donot have enough money`)

        }
        const walletId = (limit as any)._id
        const meassage = `balance calculated from ${limit.balance} to ${limit.balance - amounts.reduce((acc, amount) => acc + amount, 0)}`
        const transaction=await this._transactionDbService.findOneAndUpdate(owner,walletId,meassage)

        const check = await this._WalletDbService.calculateBalance(owner, amounts)
        if (!check) {
            return new BadRequestException("wallet not found")
        }
        return {
            Msg: `balance calculated successfully ${user}`,
            check
        }
    }
    


}