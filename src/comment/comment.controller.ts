import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { BaseController } from 'src/util/BaseController';
import { LoggerService } from 'src/services/logger.service';
import { Response } from 'express';
import { Comment } from './entities/comment.entity';
import { Messages } from 'src/common/constants/constant';
import { AuthGuard } from '@nestjs/passport';

@Controller('comment')
export class CommentController extends BaseController {
  constructor(
    private readonly commentService: CommentService,
    readonly logger: LoggerService,
  ) {
    super(logger);
    this.logger.setContext('CommentService');
  }

  @Get('/:id')
  async getComments(
    @Param('id') id: number,
    @Res() res: Response,
  ): Promise<void> {
    try {
      const data = await this.commentService.findByBlogId(id);
      this.responseWithData('', data, res);
    } catch (error) {
      this.responseException(error);
    }
  }

  @Get('/detail/:id')
  async getComment(
    @Param('id') id: number,
    @Res() res: Response
  ): Promise<void> {
    try {
      const data = await this.commentService.find(id);
      this.responseWithData('', data, res);
    } catch (error) {
      this.responseException(error);
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/create')
  async create(@Body() comment: Comment, @Res() res: Response, @Request() req): Promise<void> {
    try {
      console.log(comment);
      await this.commentService.create({ ...comment, user: req.user.userId });
      this.responseCreated(Messages.CREATE_SUCCESS, res);
    } catch (error) {
      this.responseException(error);
    }
  }

  @Delete('/delete/:id')
  async delete(@Param('id') id: number, @Res() res: Response): Promise<void> {
    try {
      await this.commentService.find(id);
      await this.commentService.delete(id);
      this.responseOK(Messages.DELETE_SUCCESS, res);
    } catch (error) {
      this.responseException(error);
    }
  }
}
