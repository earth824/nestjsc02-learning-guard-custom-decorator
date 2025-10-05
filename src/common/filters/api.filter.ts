import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ApiException } from 'src/exceptions/api.exception';
import { ErrorCode } from 'src/exceptions/error-code.constant';

type ErrorResponse = {
  message: string;
  details?: unknown;
  errorCode: ErrorCode;
  statusCode: HttpStatus;
  path: string;
  timestamp: string;
};

@Catch(ApiException)
export class ApiFilter implements ExceptionFilter {
  catch(exception: ApiException, host: ArgumentsHost) {
    const request = host.switchToHttp().getRequest<Request>();
    const response = host.switchToHttp().getResponse<Response>();

    const result: ErrorResponse = {
      errorCode: exception.errorCode,
      statusCode: exception.statusCode,
      message: exception.message,
      details: exception.details,
      path: request.path,
      timestamp: new Date().toISOString()
    };

    response.status(result.statusCode).json(result);
  }
}
