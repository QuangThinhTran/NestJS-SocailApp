import { Module } from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogController } from './blog.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Blog } from './entities/blog.entity';
import { LoggerService } from 'src/services/logger.service';
import { ImageService } from 'src/image/image.service';
import { Image } from 'src/image/enitities/image.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Blog, Image])],
  controllers: [BlogController],
  providers: [BlogService, LoggerService, ImageService],
})
export class BlogModule {}
