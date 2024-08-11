/* eslint-disable prettier/prettier */
import { PostEntity } from "src/modules/post/entities/post.entity";
import { User } from "src/modules/user/entities/user.entity";

export class CreateCommentDto{
    id:number;
    content:string;
    user:User;
    post:PostEntity

}