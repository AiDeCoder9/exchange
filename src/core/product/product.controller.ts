import { RequestSchema } from '@/decorator/request.decorator';
import { Roles } from '@/decorator/role.decorator';

import { USER_ROLE } from '@/utils/constant';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { ProductCreateRequest } from './product.dto';

import { ProductEntity } from './product.entity';
import { ProductService } from './product.service';

@ApiTags('Product API')
@Controller('product')
@Roles(USER_ROLE.GENERAL)
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  @Get()
  @HttpCode(200)
  async findAll(): Promise<ProductEntity[]> {
    return this.productService.findAll();
  }

  @Post('create')
  @UseInterceptors(FilesInterceptor('files'))
  async createProduct(
    @Body() body: ProductCreateRequest,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    return this.productService.createProduct(body, files);
  }

  @Put('mark-as-sold/:id')
  async update(@Param('id') id: number) {
    return this.productService.markAsSold(id);
  }
}
