import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { SignUpInput } from '../auth/dto/signup-input.dto';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly repository: UserRepository) {}

  async createUser(input: SignUpInput) {
    return this.repository.save(plainToInstance(User, input));
  }
}
