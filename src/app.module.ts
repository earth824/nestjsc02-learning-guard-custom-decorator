import { Module, ValidationPipe } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { AuthModule } from './auth/auth.module';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { AuthGuard } from 'src/auth/auth.guard';
import { RoleGuard } from 'src/auth/role.guard';

@Module({
  imports: [ProductsModule, AuthModule],
  providers: [
    // if there's dependency injection use this:
    // { provide: APP_GUARD, useClass: AuthGuard }
    { provide: APP_GUARD, useClass: AuthGuard }
    // { provide: APP_PIPE, useClass: ValidationPipe },
    // { provide: APP_FILTER, useClass:  }
    //  { provide: APP_INTERCEPTOR, useClass }
  ]
})
export class AppModule {}
