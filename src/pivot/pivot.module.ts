import { Module } from '@nestjs/common';
import { PivotService } from './pivot.service';
import { PivotController } from './pivot.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Blog } from '../blog/entities/blog.entity';
import { Workshop } from '../workshop/entities/workshop.entity';
import { LoggerService } from '../services/logger.service';
import { UserService } from 'src/user/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Blog, Workshop])],
  controllers: [PivotController],
  providers: [PivotService, UserService, LoggerService],
})
export class PivotModule { }
