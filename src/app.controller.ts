import { Controller, Get, Param, Res, Request, Body, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { BaseController } from './util/BaseController';
import { LoggerService } from './services/logger.service';
import { UserService } from './user/user.service';
import { Response } from 'express';
import { join } from 'path';
import { BlogService } from './blog/blog.service';
import { WorkshopService } from './workshop/workshop.service';

@Controller()
export class AppController extends BaseController {
  constructor(
    private readonly appService: AppService,
    readonly userService: UserService,
    readonly blogService: BlogService,
    readonly workshopService: WorkshopService,
    readonly logger: LoggerService,
  ) {
    super(logger);
    this.logger.setContext('Home');
  }

  @Get('/blogs')
  async getBlogs(
    @Res() res: Response,
    @Request() req
  ): Promise<void> {
    try {
      const blogs = await this.blogService.findAll();
      this.responseWithData('', blogs, res);
    } catch (error) {
      this.responseException(error);
    }
  }

  @Get('users')
  async getUsers(
    @Query('username') username: string,
    @Res() res: Response): Promise<void> {
    try {
      const users = await this.userService.findAll();
      const result = users.filter(user => user.username !== username);
      
      this.responseWithData('', result, res);
    } catch (error) {
      this.responseException(error);
    }
  }

  @Get('workshops')
  async getWorkshops(@Res() res: Response): Promise<void> {
    try {
      const workshops = await this.workshopService.findAll();
      return this.responseWithData('', workshops, res);
    } catch (error) {
      this.responseException(error);
    }
  }

  @Get('search')
  async search(
    @Query('name') name: string,
    @Query('email') email: string,
    @Res() res: Response
  ): Promise<void> {
    try {
      const blogs = await this.userService.search(name, email);
      this.responseWithData('', blogs, res);
    } catch (error) {
      this.responseException(error);
    }
  }

  @Get(':filename')
  serveImage(@Param('filename') filename: string, @Res() res: Response): void {
    const imagePath = join(__dirname, '..', 'public', filename);
    res.sendFile(imagePath);
  }

  @Get('/')
  hello(): string {
    return 'Hello ThinhDeptrai';
  }
}
