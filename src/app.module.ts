import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './modules/user/entities/user.entity';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '1234',
      database: 'nestjs',
      synchronize: true,
      logging: true,
      entities: [User], // Burada entity'nizi ekleyin
    }),
    UserModule,
  ],
})
export class AppModule {}
