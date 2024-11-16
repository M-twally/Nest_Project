import { BadRequestException, Body, Controller, Post, Put, Req, UseGuards } from "@nestjs/common";
import { WalletService } from "./wallet.service";
import { Roles } from "src/decorators/roles/roles.decorator";
import { AuthGuard } from "src/guard/auth/auth.guard";


@Controller('wallet')

export class WalletController{

    constructor(private _WalletService:WalletService){}

    @Post('CreateWallet')
    @Roles(["user"])
    @UseGuards(AuthGuard)
    createWallet(@Req() request:any){
        return this._WalletService.createWallet(request)
    }

    @Post('UpdateWallet')
    @Roles(["user"])
    @UseGuards(AuthGuard)
    updateWallet(@Req() request:any,@Body() body:any){

        const {amount}=body
        if (!amount) {
            return new BadRequestException("amount is required")
            
        }
        return this._WalletService.Updatewallet(request,amount)
    }

    @Put(`Addlimit`)
    @Roles(["user"])
    @UseGuards(AuthGuard)
    addLimit(@Req() request:any,@Body() body:any){
        const {limit}=body
        return this._WalletService.addLimit(request,limit)
    }


    @Put(`CalculateBalance`)
    @Roles(["user"])
    @UseGuards(AuthGuard)
    calculateBalance(@Req() request:any,@Body() body:any){
        const {amounts}=body
        if (amounts==null) {
            return new BadRequestException("amounts are required")
            
        }
        return this._WalletService.calculateBalance(request,amounts)
    }



}