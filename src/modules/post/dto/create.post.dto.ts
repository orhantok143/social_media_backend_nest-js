import { IsNotEmpty, IsString } from 'class-validator';
import { User } from 'src/modules/user/entities/user.entity';

export class CreatePostDto {
  id: number;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  user: User;
}
