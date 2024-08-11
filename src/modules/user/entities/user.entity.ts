// user.entity.ts
import { PostEntity } from 'src/modules/post/entities/post.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  username: string;

  @Column({ length: 40 })
  email: string;

  @Column()
  password: string;

  @OneToMany(() => PostEntity, (post) => post.user, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  posts: PostEntity[];
}
