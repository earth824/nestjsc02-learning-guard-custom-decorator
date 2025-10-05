import { HttpStatus } from '@nestjs/common';
import { ApiException } from 'src/exceptions/api.exception';
import { ERROR_CODE, ErrorCode } from 'src/exceptions/error-code.constant';

export class ValidationException extends ApiException {
  readonly errorCode: ErrorCode = ERROR_CODE.VALIDATION_ERROR;
  readonly statusCode: HttpStatus = HttpStatus.BAD_REQUEST;

  constructor(details?: unknown) {
    super('validation failed', details);
  }
}
