/* eslint-disable prettier/prettier */
import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './entity/comment.entity';
import { Repository } from 'typeorm';
import { PostEntity } from '../post/entities/post.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) {}


  async create(comment:Comment):Promise<Comment>{
    try {
        return await this.commentRepository.save(comment)
    } catch (error) {
        throw new ConflictException('Comment could not be created');
    }
  }

  async findAll(post:PostEntity):Promise<Comment[]>{
    try {
        return await this.commentRepository.findBy({post})
    } catch (error) {
        throw new ConflictException('Comment could not be get all');
    }
  }


  async findOne(id:number):Promise<Comment>{
    try {
        return await this.commentRepository.findOneBy({id})
    } catch (error) {
        throw new ConflictException('Comment could not be get all');
    }
  }
  

  async update(id:number, comment:Comment):Promise<any>{
    try {
        const updatedComment = await this.commentRepository.update(id,comment)
        return updatedComment;
    } catch (error) {
        throw new ConflictException('Comment could not be get all');
    }
  }

  async delete(id:number):Promise<Comment>{
    try {
        const comment = await this.findOne(id)
        await this.commentRepository.delete(id)
        return comment
    } catch (error) {
        throw new ConflictException('Comment could not be get all');   
    }
  }

 }
