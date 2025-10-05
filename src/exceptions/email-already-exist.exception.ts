import { HttpStatus } from '@nestjs/common';
import { ApiException } from 'src/exceptions/api.exception';
import { ERROR_CODE, ErrorCode } from 'src/exceptions/error-code.constant';

export class EmailAlreadyExistException extends ApiException {
  errorCode: ErrorCode = ERROR_CODE.EMAIL_ALREADY_EXIST;
  statusCode: HttpStatus = HttpStatus.CONFLICT;

  constructor() {
    super('this email address is already in use');
  }
}
