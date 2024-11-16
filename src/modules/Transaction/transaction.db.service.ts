import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Transaction } from "src/schema/transaction.schema";





export class TransactionDbService{


    @InjectModel(Transaction.name) private transactionModel:Model <Transaction>

    async createTransaction(data:any):Promise<Transaction>{
        const transaction=await this.transactionModel.create(data)
        return transaction

    }

    async findOne(ID: string): Promise<Transaction> {
        const transaction= await this.transactionModel.findById(ID).populate('user').populate('wallet');
        return transaction
    }

    async findOneAndUpdate(ID: string,wallet: string, historyMessage: string): Promise<Transaction> {
        const transaction = await this.transactionModel.findOneAndUpdate(
            { user: ID },  
            {
                wallet: wallet,
                $push: { history: historyMessage }  
            },
            { new: true }  
        );
        return transaction;
    }
    
    async getTransaction(ID: string): Promise<Transaction> {
        const transaction = await this.transactionModel.findOne({ user: ID }).populate('user').populate('wallet');
        return transaction;
    }

    async getTransactions(
        ID: string,                          // User ID to filter transactions by a specific user
        filter?: { [key: string]: any },     // Additional filters (optional) for more precise queries
        page: number = 1,                    // Page number for pagination (default is 1)
        limit: number = 10,                  // Number of items per page (default is 10)
        sort: Record<string, 1 | -1> = { createdAt: -1 } // Sorting criteria, defaulting to createdAt descending
    ): Promise<{ data: Transaction[], total: number }> { // Function returns an object with `data` and `total`
        
        // Step 1: Build the query
        const query = { user: ID, ...filter }; // Combine user ID and additional filters (if any)
        // Example: If `filter` is `{ title: "Purchase" }`, `query` becomes `{ user: ID, title: "Purchase" }`
        
        // Step 2: Calculate the number of documents to skip
        const skip = (page - 1) * limit; // Calculate how many documents to skip for pagination
        // Example: If `page = 2` and `limit = 10`, `skip = (2 - 1) * 10 = 10`
        
        // Step 3: Fetch transactions from the database with filters, pagination, and sorting
        const transactions = await this.transactionModel
            .find(query)                     // Fetch only documents matching the `query`
            .populate('user')                // Populate user details in each transaction
            .populate('wallet')              // Populate wallet details in each transaction
            .sort(sort)                      // Sort documents according to the `sort` parameter
            .skip(skip)                      // Skip the calculated number of documents for pagination
            .limit(limit);                   // Limit the number of documents to `limit` for pagination
        // The result is an array of `Transaction` documents (with populated user and wallet details)
        
        // Step 4: Count the total number of matching documents without pagination
        const total = await this.transactionModel.countDocuments(query);
        // This count helps determine the total number of pages based on the limit, even if pagination is applied
    
        // Step 5: Return data and total count
        return { data: transactions, total };
    }
    
    
    
    


}