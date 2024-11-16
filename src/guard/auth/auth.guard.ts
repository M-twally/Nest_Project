import { BadRequestException, CanActivate, ExecutionContext, ForbiddenException, HttpException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { log } from 'console';
import { AuthDbService } from 'src/modules/auth/auth.db.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private _JwtService: JwtService,
    private _AuthDBService: AuthDbService,
    private _reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authorization = request.headers['authorization'];

    if (!authorization || !authorization.startsWith('__lol')) {
      console.log(authorization);
      
      console.log("1");
      
      throw new BadRequestException('token not found');
    }

    const token = authorization.split('__lol')[1];
    if (!token) {
      console.log("2");
      
      throw new BadRequestException('invalid token');
    }

    try {
      const decoded = await this._JwtService.verify(token, { secret: "Lol" });
      if (!decoded[`userId`]) {
        console.log(decoded);
        console.log("3");
        log(decoded[`userId`]);
        throw new BadRequestException('invalid token');
      }

      const user = await this._AuthDBService.findById(decoded[`userId`]);
      console.log(user);
      
      if (!user) {
        console.log("4");
        throw new BadRequestException('invalid user');
      }

      const roles = this._reflector.getAllAndOverride<string[]>('roles', [
        context.getHandler(),
        context.getClass(),
      ]);

      if (roles && !roles.includes(user['role'])) {
        throw new ForbiddenException('you are not authorized');
      }

      request['user'] = user;
      console.log("whatttttt");
      console.log(user);
      
    } catch (error) {
      throw new HttpException(error.message, error.status || 400);
    }

    return true;
  }
}
