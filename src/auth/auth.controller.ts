import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  Req,
  Res,
  SerializeOptions,
  SetMetadata,
  UseInterceptors
} from '@nestjs/common';
import type { Request, Response } from 'express';
import { EmailAlreadyExistException } from 'src/exceptions/email-already-exist.exception';
import { Exclude, Transform } from 'class-transformer';

class UserEntityDto {
  id: string;
  email: string;

  @Exclude()
  password: string;

  @Transform((obj) => (obj.value as string).toUpperCase())
  firstName: string;
  lastName: string;
}

const Public = () => SetMetadata('IS_PUBLIC_KEY', true);
// reflect-metadata
// app.use('/auth')
@Controller('auth')
@SetMetadata('IS_PUBLIC_KEY', false)
export class AuthController {
  // @SetMetadata('IS_PUBLIC_KEY', true)
  @Public()
  @Post('login')
  login() {}

  @SetMetadata('TEST', 'testtest')
  @Get('refresh')
  refreshToken(@Req() req: Request, @Res() res: Response) {
    res.status(200).json({ message: 'Sent for respons eobjewct' });
  }

  @Public()
  @Post('register')
  register() {
    throw new EmailAlreadyExistException();
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @SerializeOptions({ type: UserEntityDto })
  @Public()
  @Get('me')
  getMe() {
    return {
      id: 'aaa',
      email: 'a@gmail.com',
      password: '12345',
      firstName: 'John',
      lastName: 'Doe'
    };
  }
}
