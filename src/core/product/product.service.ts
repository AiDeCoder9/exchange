import { UserService } from '@/core/user-management/user/user.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductCreateRequest } from './product.dto';
import { ProductEntity } from './product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>,
    private userService: UserService,
  ) {}

  findAll(): Promise<ProductEntity[]> {
    return this.productRepository.find();
  }
  async createProduct(
    productDetail: ProductCreateRequest,
    files: Array<Express.Multer.File>,
  ) {
    const user = await this.userService.findActiveUser();

    const requestData = {
      ...productDetail,
      files: files.map((file) => file.filename),
      user,
    };
    await this.productRepository.save(requestData);
  }
}
