import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './modules/user/entities/user.entity';
import { UserModule } from './modules/user/user.module';
import { PostModule } from './modules/post/post.module';
import { PostEntity } from './modules/post/entities/post.entity';
import { AuthModule } from './modules/auth/auth.module';
import { jwtConstants } from './modules/auth/jwt-strategy/constant';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: jwtConstants.host,
      port: jwtConstants.port,
      username: jwtConstants.username,
      password: jwtConstants.password,
      database: jwtConstants.database,
      synchronize: true,
      logging: true,
      entities: [User, PostEntity], // Burada entity'nizi ekleyin
    }),
    UserModule,
    PostModule,
    AuthModule,
  ],
})
export class AppModule {}
