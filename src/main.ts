import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AuthGuard } from 'src/auth/auth.guard';
import { RoleGuard } from 'src/auth/role.guard';
import { ValidationPipe } from '@nestjs/common';

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
      validateCustomDecorators: true
    })
  );

  await app.listen(process.env.PORT ?? 3000);
}

void bootstrap();
