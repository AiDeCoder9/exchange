import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.dto';
import { UserEntity } from './user.entity';

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
    await this.userRepository.save(user);
  }
}
