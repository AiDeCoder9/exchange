import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common';

class CreateCategoryDto {
  name: string;
  age: number;
  breed: string;
}

@Controller('category')
export class CategoryController {
  @Get()
  @HttpCode(200)
  findAll(): string {
    return 'List of category ';
  }
  @Get(':id')
  findOne(@Param('id') id: string): string {
    return `This action returns a #${id} cat `;
  }
  @Post()
  async create(@Body() createCategory: CreateCategoryDto) {
    return 'Post request' + createCategory;
  }
}
