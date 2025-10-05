import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  NotFoundException
} from '@nestjs/common';
import { Request, Response } from 'express';

type ErrorResponse = {
  success: false;
  message: string;
  details?: unknown;
  code: string;
  statusCode: number;
  path: string;
  timestamp: string;
};

@Catch(HttpException)
export class NotFoundFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const request = host.switchToHttp().getRequest<Request>();
    const response = host.switchToHttp().getResponse<Response>();
    console.log(exception.getResponse());
    const test = exception.getResponse() as { code: string; details?: unknown };
    const result: ErrorResponse = {
      success: false,
      message: exception.message,
      statusCode: exception.getStatus(),
      path: request.path,
      timestamp: new Date().toISOString(),
      code: test.code,
      details: test.details
    };
    response.status(result.statusCode).json(result);
  }
}

// class EmailAlreadyException extends BaseException {}
