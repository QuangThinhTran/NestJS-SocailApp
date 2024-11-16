import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Request,
  Put,
  Res,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { BaseController } from 'src/util/BaseController';
import { LoggerService } from 'src/services/logger.service';
import { Response } from 'express';
import { updateDescription } from './entities/update-description';
import { AuthGuard } from '@nestjs/passport';

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
      this.responseException(error);
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('/update-description')
  async update(
    @Body() data: updateDescription,
    @Res() res: Response,
    @Request() req,
  ) {
    try {
      const user = await this.userService.update(+req.user.userId, data);
      this.responseWithData('', user, res);
    } catch (error) {
      this.responseException(error);
    }
  }

  // @Put('/description/:id')
  // async updateDescription(
  //   @Param('id') id: string,
  //   @Body() data: User,
  //   @Res() res: Response,
  // ) {
  //   try {
  //     const user = await this.userService.updateDescription(+id, data);
  //     this.responseWithData('', user, res);
  //   } catch (error) {
  //     this.responseException(error);
  //   }
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
