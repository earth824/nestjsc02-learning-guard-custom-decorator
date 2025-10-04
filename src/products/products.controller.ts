import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { RoleGuard } from 'src/auth/role.guard';

// @UseGuards(RoleGuard)
@UseGuards(AuthGuard) // Decorator Factory
@Controller('products')
export class ProductsController {
  // POST /products
  @Post()
  create() {
    return 'Created Product';
  }

  @Get()
  findAll() {
    return 'Get All Product';
  }
}
