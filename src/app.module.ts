import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { BlogModule } from './blog/blog.module';
import { CommentModule } from './comment/comment.module';
import { ImageModule } from './image/image.module';
import { ReportModule } from './report/report.module';

@Module({
  imports: [AuthModule, UserModule, BlogModule, CommentModule, ImageModule, ReportModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
