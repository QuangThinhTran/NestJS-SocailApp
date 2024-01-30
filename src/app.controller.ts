import { Controller, Get, Param, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { BaseController } from './util/BaseController';
import { LoggerService } from './services/logger.service';
import { UserService } from './user/user.service';
import { BlogService } from './blog/blog.service';
import { Response } from 'express';
import { join } from 'path';

@Controller()
export class AppController extends BaseController {
  constructor(
    private readonly appService: AppService,
    readonly userService: UserService,
    readonly blogService: BlogService,
    readonly logger: LoggerService,
  ) {
    super(logger);
    this.logger.setContext('Home');
  }

  @Get()
  async home(@Res() res: Response): Promise<void> {
    try {
      const users = await this.userService.findAll();
      const blogs = await this.blogService.findAll();
      this.responseWithData('', { users, blogs }, res);
    } catch (error) {
      this.responseExeption(error);
    }
  }

  @Get(':filename')
  serveImage(@Param('filename') filename: string, @Res() res: Response): void {
    const imagePath = join(__dirname, '..', 'public', filename);
    res.sendFile(imagePath);
  }
}
