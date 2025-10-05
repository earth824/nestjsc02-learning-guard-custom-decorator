import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor
} from '@nestjs/common';
import { Request, Response } from 'express';
import { map, Observable, of } from 'rxjs';

const cache: Record<string, unknown> = {};

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // before route handler
    // GET:products
    console.log('BEFORE: Controller');
    const request = context.switchToHttp().getRequest<Request>();
    // const response = context.switchToHttp().getResponse<Response>();
    const cacheKey = `${request.method}:${request.path}`;
    if (cache[cacheKey]) {
      // response.status(200).json(cache[cacheKey]);
      return of(cache[cacheKey]);
    }
    return next.handle().pipe(
      map((data) => {
        console.log('AFTER: Controller');
        cache[cacheKey] = data;
        return data;
      })
    );
  }
}

// Observable object
