import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entities/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: User) {
    try {
      console.log(createUserDto);
      return await this.userService.create(createUserDto);
    } catch (error) {
      throw new InternalServerErrorException('Failed to create user');
    }
  }

  @Get()
  async findAll() {
    try {
      return await this.userService.findAll();
    } catch (error) {
      throw new InternalServerErrorException('Failed to retrieve users');
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    try {
      const user = await this.userService.findOne(id);
      if (!user) {
        throw new NotFoundException('User not found');
      }
      return user;
    } catch (error) {
      throw new InternalServerErrorException('Failed to retrieve user');
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateUser: Partial<User>, // Partial<User> kullanımı
  ): Promise<User> {
    try {
      const user = await this.userService.findOne(id);
      if (!user) {
        throw new NotFoundException('User not found');
      }
      await this.userService.update(id, updateUser);
      return this.userService.findOne(id); // Güncellenmiş kullanıcıyı döndür
    } catch (error) {
      throw new InternalServerErrorException('Failed to update user');
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<User> {
    try {
      const user = await this.userService.remove(id);
      if (!user) {
        throw new NotFoundException('User not found');
      }
      return user;
    } catch (error) {
      throw new InternalServerErrorException('Failed to delete user');
    }
  }
}
