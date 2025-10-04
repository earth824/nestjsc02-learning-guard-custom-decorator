import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    // get role from decorator: implement business logic based on role
    const roles = this.reflector.getAllAndOverride<
      ('admin' | 'user' | 'superadmin' | 'viewer')[] | undefined
    >('ROLE_KEY', [context.getHandler(), context.getClass()]);

    const request = context.switchToHttp().getRequest<Request>();

    if (request.user?.role && roles?.includes(request.user.role)) return true;
    throw new ForbiddenException(
      'you have no permission to access this resource'
    );
  }
}
