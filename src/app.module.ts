import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CommentModule } from './comment/comment.module';
import { ImageModule } from './image/image.module';
import { ReportModule } from './report/report.module';
import { DatabaseModule } from './common/database/database.module';
import { LoggerService } from './services/logger.service';
import { UserService } from './user/user.service';
import { BlogService } from './blog/blog.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';
import { Blog } from './blog/entities/blog.entity';
import { UserModule } from './user/user.module';
import { BlogModule } from './blog/blog.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    AuthModule,
    CommentModule,
    ImageModule,
    ReportModule,
    DatabaseModule,
    UserModule,
    BlogModule,
    TypeOrmModule.forFeature([User, Blog]),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname , '..' , 'public'),
      serveRoot: '/images'
    })
  ],
  controllers: [AppController],
  providers: [AppService, LoggerService, UserService, BlogService],
})
export class AppModule {}
