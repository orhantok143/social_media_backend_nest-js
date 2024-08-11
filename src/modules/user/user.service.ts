import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(user: User): Promise<User> {
    try {
      // Kullanıcıyı veritabanına kaydet
      const { password } = user;
      const hash = await bcrypt.hash(password, 10);
      user.password = hash;
      return await this.userRepository.save(user);
    } catch (error) {
      // Hata durumunda özel bir hata mesajı ile yanıt ver
      throw new ConflictException('User could not be created');
    }
  }

  async findAll(): Promise<User[]> {
    try {
      // Tüm kullanıcıları bul
      return await this.userRepository.find();
    } catch (error) {
      // Hata durumunda özel bir hata mesajı ile yanıt ver
      throw new ConflictException('Could not retrieve users');
    }
  }

  async findOne(id: number): Promise<User | null> {
    try {
      // Kullanıcıyı ID ile bul
      const user = await this.userRepository.findOneBy({ id });
      if (!user) {
        throw new NotFoundException('User not found');
      }
      return user;
    } catch (error) {
      // Hata durumunda özel bir hata mesajı ile yanıt ver
      throw new NotFoundException('User not found');
    }
  }

  async update(id: number, updateUser: Partial<User>): Promise<void> {
    try {
      const user = await this.findOne(id);
      if (!user) {
        throw new NotFoundException('User not found');
      }
      // Kullanıcıyı güncelle
      await this.userRepository.update(id, updateUser);
    } catch (error) {
      // Hata durumunda özel bir hata mesajı ile yanıt ver
      throw new ConflictException('Could not update user');
    }
  }

  async remove(id: number): Promise<User | null> {
    try {
      const user = await this.findOne(id);
      if (!user) {
        throw new NotFoundException('User not found');
      }
      // Kullanıcıyı sil
      await this.userRepository.delete(id);
      return user;
    } catch (error) {
      // Hata durumunda özel bir hata mesajı ile yanıt ver
      throw new ConflictException('Could not delete user');
    }
  }
}
