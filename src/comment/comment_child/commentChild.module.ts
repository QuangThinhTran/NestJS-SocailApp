import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentChild } from './entities/commentChild.entity';
import { LoggerService } from '../../services/logger.service';
import { CommentChildService } from './commentChild.service';
import { CommentChildController } from './commentChild.controller';

@Module({
  imports: [TypeOrmModule.forFeature([CommentChild])],
  controllers: [CommentChildController],
  providers: [CommentChildService, LoggerService],
})
export class CommentChildModule {}
