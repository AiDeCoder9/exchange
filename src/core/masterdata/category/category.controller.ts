import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CategoryEntity } from './category.entity';
import { CategoryService } from './category.service';
import { Category } from './dto/category.dto';

@Controller('category')
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
  async create(@Body() createCategory: Category) {
    return this.categoryService.create(createCategory);
  }
  @Put(':id')
  async update(@Param('id') id: number, @Body() updateCategoryDto: Category) {
    return this.categoryService.update(id, updateCategoryDto);
  }
}
