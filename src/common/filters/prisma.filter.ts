import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import {
  PrismaClientInitializationError,
  PrismaClientKnownRequestError,
  PrismaClientRustPanicError,
  PrismaClientUnknownRequestError,
  PrismaClientValidationError
} from '@prisma/client/runtime/library';
import { PrismaException } from 'src/exceptions/prisma.exception';

@Catch(
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientInitializationError,
  PrismaClientRustPanicError,
  PrismaClientValidationError
)
export class PrismaFilter<T> implements ExceptionFilter {
  catch(_: T, __: ArgumentsHost) {
    // logger
    throw new PrismaException();
  }
}
