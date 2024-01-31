import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  Res,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { BaseController } from 'src/util/BaseController';
import { LoggerService } from 'src/services/logger.service';
import { Response } from 'express';

@Controller('user')
export class UserController extends BaseController {
  constructor(
    private readonly userService: UserService,
    readonly logger: LoggerService,
  ) {
    super(logger);
    this.logger.setContext('UserService');
  }

  @Get(':username')
  async findOne(@Param('username') username: string, @Res() res: Response) {
    try {
      const user = await this.userService.findByUsername(username);
      this.responseWithData('', user, res);
    } catch (error) {
      this.responseExeption(error);
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() data: User,
    @Res() res: Response,
  ) {
    try {
      const user = await this.userService.update(+id, data);
      this.responseWithData('', user, res);
    } catch (error) {
      this.responseExeption(error);
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
