import { Controller, Get, Post, Req, Res, SetMetadata } from '@nestjs/common';
import type { Request, Response } from 'express';

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
}
