import { Controller, Get, UseGuards, Req, Post, Body, Query } from "@nestjs/common";
import { UserService } from "./user.service";
import { Roles } from "src/decorators/roles/roles.decorator";
import { AuthGuard } from "src/guard/auth/auth.guard";




@Controller(`user`)

export class UserController {

    constructor(private UserService: UserService) { }

    @Get('profile')
    @Roles([`user`])
    @UseGuards(AuthGuard)

    getProfile(@Req() request: any) {
        console.log("doodododod");

        console.log(request[`user`]);

        return this.UserService.getProfile(request);
    }


    @Post("verifyEmail")
    @Roles([`user`])
    @UseGuards(AuthGuard)
    async verifyEmail(@Req() request: any, @Body() body: any) {
        const { code } = body
        return this.UserService.verifyEmail(code, request)
    }

    @Get('sendEmailOTP')
    @Roles(['user'])
    @UseGuards(AuthGuard)
    async sendEmailOTP(@Req() request: any) {
        return this.UserService.sendEmailOTP(request);
    }

    @Get('getWallet')
    @Roles(['user'])
    @UseGuards(AuthGuard)
    async GetWallet(@Req() request: any) {
        return this.UserService.GetWallet(request);
    }

    @Get('getTransaction')
    @Roles(['user'])
    @UseGuards(AuthGuard)
    async GetTransaction(@Req() request: any) {
        return this.UserService.GetTransaction(request);
    }

    @Get('getTransaction')
    @Roles(['user'])
    @UseGuards(AuthGuard)
    async GetTransactions(
        @Req() request: any,
        @Query('page') page?: string,
        @Query('limit') limit?: string,
        @Query('sort') sortField: string = 'createdAt',
        @Query('order') order: 'asc' | 'desc' = 'desc',
        @Query() filter: Record<string, any> = {} // Default to an empty object for additional filters
    ) {
        const userID = request.user.id; // Get user ID from authenticated request
    
        // Convert `page` and `limit` to numbers, and set default values if undefined
        const pageNumber = page ? parseInt(page, 10) : 1;
        const limitNumber = limit ? parseInt(limit, 10) : 10;
    
        // Convert `order` to 1 (ascending) or -1 (descending) for MongoDB sorting
        const sortOrder = order === 'asc' ? 1 : -1;
        const sort = { [sortField]: sortOrder };
    
        // Create an object to pass as a single argument to the service
        const queryParams = {
            userID,
            filter,
            page: pageNumber,
            limit: limitNumber,
            sort
        };
    
        // Call the service function with the queryParams object
        return await this.UserService.getTransactions(queryParams);
    }
    
}