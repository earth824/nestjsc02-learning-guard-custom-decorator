import {
  BadRequestException,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Post,
  Put,
  Req,
  SetMetadata,
  UseFilters,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from 'src/auth/auth.guard';
import { RoleGuard } from 'src/auth/role.guard';
import { NotFoundFilter } from 'src/common/filters/not-found.filter';
import { TransformInterceptor } from 'src/common/interceptors/transform.interceptor';
import { CurrentUser } from 'src/current-user.decorator';
import { CurrentUserDto } from 'src/current-user.dto';

const Roles = (...roles: ('admin' | 'user' | 'superadmin' | 'viewer')[]) =>
  SetMetadata('ROLE_KEY', roles);

// @UseGuards(RoleGuard)
// @UseGuards(AuthGuard) // Decorator Factory
@SetMetadata('ROLE_KEY', 'admin')
@Controller('products')
export class ProductsController {
  // POST /products
  // @Roles('admin', 'superadmin')

  // @UseGuards(RoleGuard)
  // @Roles('admin', 'superadmin')
  @Post()
  create(@CurrentUser() user: CurrentUserDto) {
    // { id: 'abcd', email: 'a@gmail.com' }
    // req.user.id
    // call service and pass user id
    return user;
    // return 'Created Product';
  }

  // @UseFilters(NotFoundFilter)
  @SetMetadata('IS_PUBLIC_KEY', true)
  // @Roles('customer')
  @UseInterceptors(TransformInterceptor)
  @Get()
  findAll() {
    // throw new BadRequestException({
    //   code: 'PRODUCT_NOT_FOUND',
    //   details: 'cannot find product'
    // });
    console.log('INSIDE: Controller');
    return 'Get All Product'; // { data: "Get All Product" }
  }

  @Delete()
  delete() {}

  @Put()
  update() {}
}
