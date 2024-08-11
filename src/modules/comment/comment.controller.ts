/* eslint-disable prettier/prettier */
import { PostService } from './../post/post.service';
import { Body, Delete, Get, InternalServerErrorException, NotFoundException, Patch, Post, UseGuards } from '@nestjs/common';
import { Controller, Param, Request } from '@nestjs/common';
import { CommentService } from './comment.service';
import { Comment } from './entity/comment.entity';
import { CreateCommentDto } from './dto/create.comment.dto copy';
import { UserService } from '../user/user.service';
import { JwtAuthGuard } from '../auth/auth.guard';

@Controller('comment')
export class CommentController {
  constructor(
    private readonly commentService: CommentService,
    private readonly userService: UserService,
    private readonly postService: PostService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post(":id")
  async create(
    @Param('id') id: number,
    @Body() comment: CreateCommentDto,
    @Request() req: any,
  ): Promise<Comment> {
    try {
      const user = await this.userService.findOne(req.user.userId);
      if (!user) {
        throw new NotFoundException('User not found');
      }

      const post = await this.postService.findOne(id);
      if (!post) {
        throw new NotFoundException('Post not found');
      }
      comment.post = post;
      comment.user = user;     
      return await this.commentService.create(comment);
    } catch (error) {
        throw new InternalServerErrorException('Failed to create comment');
    }
  }

@UseGuards(JwtAuthGuard)
@Get(":id")
async findAll(@Param("id")id:number):Promise<Comment[]>{
    try {
        const post = await this.postService.findOne(id)
        if (post) {
          return await this.commentService.findAll(post)
        }else{
          throw new NotFoundException('Post not found');
        }
    } catch (error) {
        throw new InternalServerErrorException('Failed to get all comment');
    }
}

@UseGuards(JwtAuthGuard)
@Get(":id")
async findOne(@Param("id")id:number):Promise<Comment>{
    try {
        return await this.commentService.findOne(id)
    } catch (error) {
        throw new InternalServerErrorException('Failed to get one comment');
    }
}

@UseGuards(JwtAuthGuard)
@Patch(":id")
async update(@Param("id")id:number, @Body()comment:Comment):Promise<Comment>{
    try {
       await this.commentService.update(id,comment);
       const updatecomment = await this.findOne(id);
       return updatecomment;
    
    } catch (error) {
        throw new InternalServerErrorException('Failed to get one comment');
    }    
}

@Delete(":id")
async delete(@Param("id") id:number):Promise<Comment>{
    try {
        return await this.commentService.delete(id)
    } catch (error) {
        throw new InternalServerErrorException('Failed to get one comment');
    }        
}

}


