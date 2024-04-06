import { Module } from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogController } from './blog.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Blog } from './entities/blog.entity';
import { LoggerService } from 'src/services/logger.service';
import { ImageService } from 'src/image/image.service';
import { Image } from 'src/image/enitities/image.entity';
import { CommentChild } from '../comment/comment_child/entities/commentChild.entity';
import { CommentChildService } from '../comment/comment_child/commentChild.service';

@Module({
  imports: [TypeOrmModule.forFeature([Blog, Image, CommentChild])],
  controllers: [BlogController],
  providers: [BlogService, LoggerService, ImageService, CommentChildService],
})
export class BlogModule {}
