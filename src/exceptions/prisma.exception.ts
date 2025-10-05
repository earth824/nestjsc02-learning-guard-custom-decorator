import { HttpStatus } from '@nestjs/common';
import { ApiException } from 'src/exceptions/api.exception';
import { ERROR_CODE, ErrorCode } from 'src/exceptions/error-code.constant';

export class PrismaException extends ApiException {
  errorCode: ErrorCode = ERROR_CODE.DATABASE_ERROR;
  statusCode: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR;

  constructor() {
    super('Something went wrong with database');
  }
}
