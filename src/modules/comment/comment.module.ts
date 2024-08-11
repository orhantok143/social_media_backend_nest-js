/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './entity/comment.entity';
import { UserModule } from '../user/user.module';
import { PostModule } from '../post/post.module';
import { User } from '../user/entities/user.entity';
import { PostEntity } from '../post/entities/post.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ Comment,User,PostEntity ]),UserModule,PostModule],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
