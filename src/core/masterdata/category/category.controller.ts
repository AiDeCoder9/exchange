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
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { CategoryEntity } from './category.entity';
import { CategoryService } from './category.service';
import { Category } from './dto/category.dto';

@ApiTags('Category API')
@Controller('category')
@Roles(USER_ROLE.ADMIN)
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}
  @Get()
  @HttpCode(200)
  async findAll(): Promise<CategoryEntity[]> {
    return this.categoryService.findAll();
  }
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<CategoryEntity | null> {
    return this.categoryService.findOne(id);
  }
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.categoryService.remove(id);
  }

  @Post()
  @RequestSchema(Category)
  async create(@Body() createCategory: Category) {
    return this.categoryService.create(createCategory);
  }
  @Put(':id')
  @RequestSchema(Category)
  async update(@Param('id') id: number, @Body() updateCategoryDto: Category) {
    return this.categoryService.update(id, updateCategoryDto);
  }
}
