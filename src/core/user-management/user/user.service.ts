import { USER_ROLE } from '@/utils/constant';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.dto';
import { UserEntity } from './user.entity';
import * as bcrypt from 'bcrypt';
import { EmailVerificationService } from '@/core/email-verification/email-verification.service';
import { AsyncLocalStorage } from 'async_hooks';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private emailVerificationService: EmailVerificationService,
    private readonly asyncLocalStorage: AsyncLocalStorage<any>,
  ) {}

  findOne(email: string): Promise<UserEntity | null> {
    return this.userRepository.findOneBy({ email });
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
  getUserId(): string {
    const test = this.asyncLocalStorage.getStore();
    console.log(test, 'test');
    return JSON.stringify(test);
  }
}
