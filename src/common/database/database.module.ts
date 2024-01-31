import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Blog } from 'src/blog/entities/blog.entity';
import { Image } from 'src/image/enitities/image.entity';
import { Comment } from 'src/comment/entities/comment.entity';
import { Report } from 'src/report/entities/report.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: process.env.DB_CONNECTION as any,
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [User, Blog, Image, Comment, Report],
      synchronize: process.env.DB_SYNCHRONIZE as any,
    }),
  ],
})
export class DatabaseModule {}
