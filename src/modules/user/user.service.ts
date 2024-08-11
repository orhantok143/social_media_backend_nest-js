import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(user: User): Promise<User> {
    return await this.userRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOne(id: number): Promise<User | null> {
    return await this.userRepository.findOneBy({ id });
  }

  async update(id: number, updateUser: Partial<User>): Promise<void> {
    await this.userRepository.update(id, updateUser);
  }

  async remove(id: number): Promise<User | null> {
    const user = await this.findOne(id);
    if (user) {
      await this.userRepository.delete(id);
    }
    return user;
  }
}
