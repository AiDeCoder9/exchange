import { UserService } from '@/core/user-management/user/user.service';
import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CategoryEntity } from './category.entity';
import { Category } from './dto/category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private categoryRepository: Repository<CategoryEntity>,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
  ) {}

  findAll(): Promise<CategoryEntity[]> {
    return this.categoryRepository.find();
  }
  async findMatchedCategories(categories: number[]) {
    return await this.categoryRepository.findBy({
      id: In(categories),
    });
  }

  findOne(id: number): Promise<CategoryEntity | null> {
    return this.categoryRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.categoryRepository.delete(id);
  }
  async create(createCategory: Category) {
    const user = await this.userService.findActiveUser();
    const requestData = { ...createCategory, user };
    await this.categoryRepository.save(requestData);
  }

  async update(id: number, updateCategoryDto: Category) {
    const category = await this.categoryRepository.findOneBy({ id });
    const user = await this.userService.findActiveUser();
    if (category) {
      category.name = updateCategoryDto.name ?? category.name;
      category.description =
        updateCategoryDto.description ?? category.description;
      category.user = user;
      this.categoryRepository.update(id, category);
    }
  }
}
