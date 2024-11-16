import { BadRequestException, Injectable } from "@nestjs/common";
import { MailService } from "src/Mail/mail/mail.service";
import { customAlphabet } from 'nanoid';
import { UserDbService } from "./user.db.service";
import { AuthDbService } from "../auth/auth.db.service";
import { log } from "console";
import { WalletDbService } from "../Wallet/wallet.db.service";
import { TransactionDbService } from "../Transaction/transaction.db.service";

@Injectable()

export class UserService{

    private readonly alphabetOtp: string;

       constructor(private readonly mailService:MailService,private _UserDbService:UserDbService,private _AuthDbService:AuthDbService ,private _WalletDbService: WalletDbService, private _transactionDbService: TransactionDbService){
        this.alphabetOtp = '0123456789';
       }

       generateOTPCode(): string {
        const codeGenerator = customAlphabet(this.alphabetOtp, 4);
        return codeGenerator();
      }

    getProfile( request:any){
        console.log(`get profile called`);
        console.log(request[`user`]);
        
        return {
            Msg:`Hello ${request[`user`][`name`]}!`, 
            user:request[`user`]
        }

    }

    async verifyEmail(code:string,request:any){
        console.log(`verify email called`);
        console.log(request[`user`][`email`]);
        const user=await this._AuthDbService.findByEmail(request[`user`][`email`])
        log(user);
        if(!user){
            throw new BadRequestException("email not found")
        }
        log(user[`code`]);
        log(code);

        if(user[`code`]!=code){
            throw new BadRequestException("invalid code")
        }

        if (user[`verified`]==true) {
            throw new BadRequestException("email already verified")
        }
        const updateUser=await this._UserDbService.findOneAndUpdate(request[`user`][`email`],{code})
        return {
            Msg:`Email Verified Successfully`, 
            updateUser:updateUser
        }

    }

    async sendEmailOTP(request: any) {
        console.log(`send email otp called`);
    
        const generateOtp = customAlphabet(this.alphabetOtp, 4);
        const otp = generateOtp();

        const user=await this._AuthDbService.findByEmail(request[`user`][`email`])
        console.log(user);
        
        await this._UserDbService.findOneAndUpdate(request[`user`][`email`],{code:otp});

    
        const userEmail = request[`user`][`email`]; 
        const subject = 'Your OTP Code';
        const text = `Your OTP code is: ${otp}`;
        const html = `<p>Your OTP code is: <strong>${otp}</strong></p>`;
    
        await this.mailService.sendEmail({
          to: userEmail,
          subject,
          text,
          html,
        });
    
        return {
          Msg: `Your OTP has been sent to your email`,
        };
      }

    async GetWallet(request:any){
        console.log(`get wallet called`);
        const id=request[`user`][`_id`];
        const name=request[`user`][`name`];
        const wallet=await this._WalletDbService.getWallet(id)
        if (!wallet) {
            return new BadRequestException("wallet not found")
            
        }
        return{
            Msg:`your wallet ${name}`,
            wallet
        }
      }

      async GetTransaction(request:any){
        console.log(`get transaction called`);
        const id=request[`user`][`_id`];
        const name=request[`user`][`name`];
        const transaction=await this._transactionDbService.getTransaction(id)
        if (!transaction) {
            return new BadRequestException("transaction not found")
            
        }
        return{
            Msg:`your transactions ${name}`,
            transaction
        }
      }

      async getTransactions(request: any) {
        console.log(`get transactions called`);
    
        // Step 1: Extract user ID and name from the request object
        const id = request.user._id;
        const name = request.user.name;
    
        // Step 2: Define the optional filter and set default values for pagination and sorting
        const filter = request.query.filter || {}; // Use an empty object if no filter is provided
        const page = Number(request.query.page) || 1;
        const limit = Number(request.query.limit) || 10;
        const sort = request.query.sort || { createdAt: -1 };
    
        // Step 3: Call the service function to get transactions with optional filters, pagination, and sorting
        const transactions = await this._transactionDbService.getTransactions(id, filter, page, limit, sort);
    
        // Step 4: Check if transactions are found
        if (!transactions || transactions.data.length === 0) {
            throw new BadRequestException("No transactions found");
        }
    
        // Step 5: Return the transactions along with a custom message
        return {
            Msg: `Here are your transactions, ${name}`,
            transactions
        };
    }
    



}