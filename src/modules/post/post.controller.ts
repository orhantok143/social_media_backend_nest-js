import {
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { PostService } from './post.service';
import { PostEntity } from './entities/post.entity';
import { JwtAuthGuard } from '../auth/auth.guard';
import { CreatePostDto } from './dto/create.post.dto';

@Controller('post')
export class PostController {
  constructor(private readonly postservice: PostService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createPost(
    @Body() post: CreatePostDto,
    @Request() req,
  ): Promise<PostEntity> {
    try {
      post.user = req.user.userId;
      return await this.postservice.create(post);
    } catch (error) {
      throw new InternalServerErrorException('Failed to create post');
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(): Promise<PostEntity[]> {
    try {
      return await this.postservice.findAll();
    } catch (error) {
      throw new InternalServerErrorException('Failed to get all post');
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<PostEntity> {
    try {
      return await this.postservice.findOne(id);
    } catch (error) {
      throw new InternalServerErrorException('Failed to get one post');
    }
  }

  @UseGuards(JwtAuthGuard)
  @Patch('id')
  async update(
    @Param('id') id: number,
    @Body() post: PostEntity,
  ): Promise<PostEntity> {
    try {
      return await this.postservice.update(id, post);
    } catch (error) {
      throw new InternalServerErrorException('Failed to update post');
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<PostEntity> {
    try {
      const deletedPost = this.findOne(id);
      await this.postservice.delete(id);
      return deletedPost;
    } catch (error) {
      throw new InternalServerErrorException('Failed to delete post');
    }
  }
}
