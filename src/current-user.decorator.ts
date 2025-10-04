import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

// { id: string, email:string }
export const CurrentUser = createParamDecorator(
  (_: string, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest<Request>();
    return { id: request.user?.sub, role: request.user?.role };
    // return { id: 'abcd', email: 'a@gmail.com' };
  }
);
