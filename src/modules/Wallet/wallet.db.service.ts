import { BadRequestException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Wallet } from "src/schema/wallet.schema";








export class WalletDbService{

    @InjectModel(Wallet.name) private walletModel:Model <Wallet>


    async createWallet(id:string): Promise<Wallet>{
        const wallet=await this.walletModel.create({owner:id})
        return wallet 

    }

    async findOne(ID: string): Promise<Wallet> {
        const user = await this.walletModel.findOne({ owner: ID }).populate('owner');
        return user;
    }
    

    async findOneAndUpdate(ID:string,balance:number):Promise<Wallet>{
        console.log(ID);
        
        const user =await this.walletModel.findOneAndUpdate({owner:ID},{balance:balance},{new:true})
        return user
    }

    async findOneAndUpdateNew(ID: string, updateFields: Partial<Wallet>): Promise<Wallet> {
        console.log(ID);
    
        const user = await this.walletModel.findOneAndUpdate(
            { owner: ID },
            updateFields,
            { new: true }
        );
        return user;
    }
    
    async GetBalance(ID:string):Promise<Wallet>{
        const user =await this.walletModel.findOne({owner:ID})
        if (!user || user.balance == null) {
            throw new BadRequestException("Wallet not found");
            
        }
        return user
    }

    async calculateBalance(Id: string, amounts: number[]): Promise<Wallet | null> {
        const wallet = await this.walletModel.findOne({ owner: Id });
    
        if (!wallet) {

            throw new BadRequestException("Wallet not found");
        }
    
        
        const totalAmount = amounts.reduce((acc, amount) => acc + amount, 0);
    

        if (wallet.balance < totalAmount) {
        
            throw new BadRequestException("You do not have enough money for these amounts");
        }
    
        
        const newBalance = wallet.balance - totalAmount;
    
        const updatedWallet = await this.walletModel.findOneAndUpdate(
            { owner: Id },             
            { balance: newBalance },     
            { new: true }                
        );
    
        return updatedWallet;
    }

    async getWallet(ID: string): Promise<Wallet> {
        const wallet = await this.walletModel.findOne({ owner: ID }).populate('owner');
        return wallet;
    }
    
    

}