import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService, TokenExpiredError } from '@nestjs/jwt';
import { Request, Response } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    console.log('Auth guard executed');
    // console.log(context.getClass().name);
    // console.log(context.getHandler().name);
    // console.log(context.getType()); // ws, rpc, http
    // http: Request Object, Response Object
    // const request = context.switchToHttp().getRequest<Request>();
    // console.log(request.query);
    // const response = context.switchToHttp().getResponse<Response>();
    // const data = context.switchToHttp().getRequest();
    // console.log(data.query);
    // response.status(500).json('exit from guard');

    // read metadata from custom decorator
    // isPublic: true ===> return true
    // isPublic: false ===> verify jwt below
    // ['user', ['admin']]
    // [undefined, 'user']
    // const result = this.reflector.getAllAndOverride('ROLE_KEY', [
    //   context.getHandler(),
    //   context.getClass()
    // ]);
    // console.log(result);

    const isPublic = this.reflector.getAllAndOverride<boolean | undefined>(
      'IS_PUBLIC_KEY',
      [context.getHandler(), context.getClass()]
    );

    if (isPublic) return true;

    const request = context.switchToHttp().getRequest<Request>();
    // Bearer jwt_token ===> ['Bearer', 'jwt_token']
    // const jwt = request.headers.authorization?.split(' ')[1];
    // if (!jwt) throw new UnauthorizedException('JWT is required');
    // try {
    //   const payload = await this.jwtService.verifyAsync<{ sub: string }>(jwt);
    //   // request.user = payload;
    // } catch (error) {
    //   if (error instanceof TokenExpiredError) {
    //     throw new UnauthorizedException({
    //       message: 'token expired',
    //       code: 'TOKEN_EXPIRED'
    //     });
    //   }
    //   throw new UnauthorizedException({
    //     message: 'invalid token. please login again',
    //     code: 'INVALID_JWT'
    //   });
    // }

    // verify jwt: jwtService

    request.user = { sub: 'abcdefgh', role: 'admin' };

    return true; // throw new ForbiddenException()
  }
}

// JWT : Bearer authorization
// JWT : Cookie

// declare module 'express' {
//   interface Request {
//     user?: { sub: string };
//   }
// }

// access_token, refresh_token
