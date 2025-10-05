import { HttpStatus } from '@nestjs/common';
import { ErrorCode } from 'src/exceptions/error-code.constant';

export abstract class ApiException extends Error {
  abstract readonly errorCode: ErrorCode;
  abstract readonly statusCode: HttpStatus;

  constructor(
    message: string,
    public readonly details?: unknown
  ) {
    super(message);
  }
}
