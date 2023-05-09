import { USER_ROLE } from '@/utils/constant';
import {
  BadRequestException,
  Inject,
  Injectable,
  UnauthorizedException,
  forwardRef,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PreferencesRequest, User } from './user.dto';
import { UserEntity } from './user.entity';
import * as bcrypt from 'bcrypt';
import { EmailVerificationService } from '@/core/email-verification/email-verification.service';
import { AsyncLocalStorage } from 'async_hooks';
import { CategoryService } from '@/core/masterdata/category/category.service';
import { CategoryEntity } from '@/core/masterdata/category/category.entity';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @Inject(forwardRef(() => CategoryService))
    private readonly categoryService: CategoryService,
    private emailVerificationService: EmailVerificationService,
    private readonly asyncLocalStorage: AsyncLocalStorage<any>,
  ) {}

  findOne(email: string): Promise<UserEntity | null> {
    return this.userRepository.findOneBy({ email });
  }
  async findById(id: number): Promise<UserEntity> {
    const user = await this.userRepository.findOneBy({ id });
    if (user) return user;
    throw new BadRequestException('User not found');
  }
  async findActiveUser(): Promise<UserEntity> {
    const { id } = this.asyncLocalStorage.getStore();
    const user = await this.userRepository.findOneBy({ id });
    if (user) return user;
    throw new UnauthorizedException('Active Session not found');
  }
  async create(user: User) {
    const request = { ...user, role: USER_ROLE.GENERAL };
    const password = (Math.floor(Math.random() * 9000000) + 1000000).toString();
    const hashedPassword = await bcrypt.hash(password, 10);
    await this.userRepository.save({ ...request, password: hashedPassword });
    this.emailVerificationService.sendVerificationEmail(user.email, password);
  }
  async createAdminUser(user: User) {
    const request = { ...user, role: USER_ROLE.ADMIN };
    const password = Math.floor(Math.random() * 9000000) + 1000000;
    const hashedPassword = await bcrypt.hash(password.toString(), 10);
    await this.userRepository.save({ ...request, password: hashedPassword });
  }

  async resendVerificationLink(email: string, password: string) {
    const user = await this.userRepository.findOneBy({ email });
    if (user?.isEmailVerified) {
      throw new BadRequestException('Email is already verified');
    }
    await this.emailVerificationService.sendVerificationEmail(email, password);
  }
  async markEmailAsVerified(email: string) {
    await this.userRepository.update(
      { email },
      {
        isEmailVerified: true,
      },
    );
  }

  async updateUserPassword(password: string) {
    const { id } = this.asyncLocalStorage.getStore();
    await this.userRepository.update(
      { id },
      { password, isEmailVerified: true },
    );
  }

  async setUserPreferences(preferences: PreferencesRequest) {
    const preferenceData = await this.categoryService.findMatchedCategories(
      preferences.categories,
    );
    if (preferenceData.length !== preferences.categories.length) {
      throw new Error('One or more preference are invalid');
    }
    const user = await this.findActiveUser();
    user.categories = preferenceData;
    await this.userRepository.save(user);
  }
  async getUserPreferences(): Promise<CategoryEntity[] | null> {
    const { id } = this.asyncLocalStorage.getStore();
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['categories'],
    });
    return user?.categories ?? null;
  }
}
