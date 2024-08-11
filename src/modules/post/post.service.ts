import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostEntity } from './entities/post.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>,
  ) {}

  async create(post: PostEntity): Promise<PostEntity> {
    try {
      console.log(post);
      return await this.postRepository.save(post);
    } catch (error) {
      throw new ConflictException('Post could not be created');
    }
  }

  async findAll(): Promise<PostEntity[]> {
    try {
      return await this.postRepository.find();
    } catch (error) {
      throw new ConflictException('Post could not be get all');
    }
  }

  async findOne(id: number): Promise<PostEntity> {
    try {
      return await this.postRepository.findOneBy({ id });
    } catch (error) {
      throw new ConflictException('Post could not be find');
    }
  }

  async update(id: number, post: PostEntity): Promise<any> {
    try {
      return await this.postRepository.update(id, post);
    } catch (error) {
      throw new ConflictException('Post could not be updated');
    }
  }

  async delete(id: number): Promise<PostEntity> {
    try {
      const deletedPost = await this.findOne(id);
      await this.postRepository.delete(id);
      return deletedPost;
    } catch (error) {
      throw new ConflictException('Post could not be deleted');
    }
  }
}
