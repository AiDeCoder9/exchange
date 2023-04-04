import { USER_ROLE } from '@/utils/constant';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.dto';
import { UserEntity } from './user.entity';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  findOne(email: string): Promise<UserEntity | null> {
    return this.userRepository.findOneBy({ email });
  }
  async create(user: User) {
    const request = { ...user, role: USER_ROLE.GENERAL };
    const hashedPassword = await bcrypt.hash(user.password, 10);
    await this.userRepository.save({ ...request, password: hashedPassword });
  }
  async createAdminUser(user: User) {
    const request = { ...user, role: USER_ROLE.ADMIN };
    const hashedPassword = await bcrypt.hash(user.password, 10);
    await this.userRepository.save({ ...request, password: hashedPassword });
  }
}
