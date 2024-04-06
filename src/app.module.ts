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
import { RatingService } from './rating/rating.service';
import { RatingController } from './rating/rating.controller';
import { WorkshopModule } from './workshop/workshop.module';
import { WorkshopService } from './workshop/workshop.service';
import { Workshop } from './workshop/entities/workshop.entity';
import { PivotModule } from './pivot/pivot.module';
import { CommentChildModule } from './comment/comment_child/commentChild.module';

@Module({
  imports: [
    AuthModule,
    CommentModule,
    ImageModule,
    ReportModule,
    DatabaseModule,
    UserModule,
    BlogModule,
    CommentChildModule,
    TypeOrmModule.forFeature([User, Blog, Workshop]),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      serveRoot: '/images',
    }),
    WorkshopModule,
    PivotModule,
  ],
  controllers: [AppController, RatingController],
  providers: [
    AppService,
    LoggerService,
    UserService,
    BlogService,
    RatingService,
    WorkshopService,
  ],
})
export class AppModule {}
