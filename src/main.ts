import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AuthGuard } from 'src/auth/auth.guard';
import { RoleGuard } from 'src/auth/role.guard';
import { ValidationPipe } from '@nestjs/common';
import { NotFoundFilter } from 'src/common/filters/not-found.filter';
import { ValidationException } from 'src/exceptions/validation.exception';
import { ApiFilter } from 'src/common/filters/api.filter';
import { PrismaFilter } from 'src/common/filters/prisma.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // use this case: no dependency injection
  // app.useGlobalGuards(new AuthGuard(), new RoleGuard());
  // app.useGloba

  // @Body, @Query, @Param
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      validateCustomDecorators: true,
      exceptionFactory(errors) {
        throw new ValidationException(errors);
      }
    })
  );

  app.useGlobalFilters(
    new PrismaFilter(),
    new ApiFilter(),
    new NotFoundFilter()
  );

  await app.listen(process.env.PORT ?? 3000);
}

void bootstrap();

type SuccessResponse<T = unknown> = {
  success: true;
  message: string;
  data?: T;
  meta?: {
    total: number;
    limit: number;
  };
};
