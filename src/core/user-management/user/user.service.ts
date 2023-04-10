import { USER_ROLE } from '@/utils/constant';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.dto';
import { UserEntity } from './user.entity';
import * as bcrypt from 'bcrypt';
import { EmailVerificationService } from '@/core/email-verification/email-verification.service';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private emailVerificationService: EmailVerificationService,
  ) {}

  findOne(email: string): Promise<UserEntity | null> {
    return this.userRepository.findOneBy({ email });
  }
  async create(user: User) {
    const request = { ...user, role: USER_ROLE.GENERAL };
    const hashedPassword = await bcrypt.hash(user.password, 10);
    await this.userRepository.save({ ...request, password: hashedPassword });
    this.emailVerificationService.sendVerificationEmail(user.email);
  }
  async createAdminUser(user: User) {
    const request = { ...user, role: USER_ROLE.ADMIN };
    const hashedPassword = await bcrypt.hash(user.password, 10);
    await this.userRepository.save({ ...request, password: hashedPassword });
  }

  async resendVerificationLink(email: string) {
    const user = await this.userRepository.findOneBy({ email });
    if (user?.isEmailVerified) {
      throw new BadRequestException('Email is already verified');
    }
    await this.emailVerificationService.sendVerificationEmail(email);
  }
  async markEmailAsVerified(email: string) {
    await this.userRepository.update(
      { email },
      {
        isEmailVerified: true,
      },
    );
  }
}
