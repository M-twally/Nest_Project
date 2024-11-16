import { Body, Controller, Post, UsePipes } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SignInDto, SignUpDto } from "./validation/auth.dto";
import * as validator from "../auth/validation/auth.joi"
import { JoiValidationPipePipe } from "../Pipe/joi-validation-pipe/joi-validation-pipe.pipe";



@Controller('auth')

export class AuthController {

    constructor(private _AuthService: AuthService) { }

    @Post('signup')
    @UsePipes(new JoiValidationPipePipe(validator.signup))

    signup(@Body() body: SignUpDto) {
        return this._AuthService.signUp(body)
    }


    @Post('signin')
    @UsePipes(new JoiValidationPipePipe(validator.signin))
    signin(@Body() body: SignInDto) {
        return this._AuthService.signIn(body)
    }
}