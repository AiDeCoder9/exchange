import { UserService } from '@/core/user-management/user/user.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductCreateRequest } from './product.dto';
import { ProductEntity } from './product.entity';
import { CategoryService } from '../masterdata/category/category.service';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>,
    private userService: UserService,
    private categoryService: CategoryService,
  ) {}

  findAll(): Promise<ProductEntity[]> {
    return this.productRepository.find();
  }
  async findById(id: number) {
    const product = await this.productRepository.findOneBy({ id });
    if (product) return product;
    throw new BadRequestException('Product not found');
  }

  async createProduct(
    productDetail: ProductCreateRequest,
    files: Array<Express.Multer.File>,
  ) {
    const user = await this.userService.findActiveUser();
    const categories = await this.categoryService.findMatchedCategories(
      productDetail.categories,
    );
    if (categories.length !== productDetail.categories.length) {
      throw new Error('One or more preference are invalid');
    }

    const product = new ProductEntity();
    product.categories = categories;

    const requestData = {
      ...productDetail,
      ...product,
      files: files.map((file) => file.filename),
      user,
    };

    await this.productRepository.save(requestData);
  }
  async markAsSold(id: number) {
    const product = new ProductEntity();
    product.available = false;
    this.productRepository.update(id, product);
  }
  async productDetail(id: number): Promise<ProductEntity | null> {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: ['categories'],
    });
    return product;
  }
  async findProductChats(productId: number) {
    const product = await this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.chats', 'chat')
      .where('product.id = :id', { id: productId })
      .getOne();
    if (product) return product.chats;
    throw new BadRequestException('No chat history found');
  }
}
