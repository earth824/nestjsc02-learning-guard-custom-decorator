import {
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Req,
  SetMetadata,
  UseGuards
} from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from 'src/auth/auth.guard';
import { RoleGuard } from 'src/auth/role.guard';
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

  @SetMetadata('ROLE_KEY', 'user')
  // @Roles('customer')
  @Get()
  findAll() {
    return 'Get All Product';
  }

  @Delete()
  delete() {}

  @Put()
  update() {}
}
