import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { BaseController } from '../../util/BaseController';
import { LoggerService } from '../../services/logger.service';
import { CommentChildService } from './commentChild.service';
import { Response } from 'express';
import { CommentChild } from './entities/commentChild.entity';
import { Messages } from '../../common/constants/constant';

@Controller('comment-child')
export class CommentChildController extends BaseController {
  constructor(
    private readonly commentChildService: CommentChildService,
    readonly logger: LoggerService,
  ) {
    super(logger);
    logger.setContext('CommentChild');
  }

  @Get('/:id')
  async index(@Param('id') id: number, @Res() res: Response): Promise<void> {
    try {
      const commentChild =
        await this.commentChildService.getCommentChildByID(id);

      return this.responseWithData('', commentChild, res);
    } catch (e) {
      this.responseException(e);
    }
  }

  @Post('/create')
  async store(@Body() data: CommentChild, @Res() res: Response): Promise<void> {
    try {
      await this.commentChildService.create(data);
      return this.responseCreated(Messages.CREATE_SUCCESS, res);
    } catch (e) {
      this.responseException(e);
    }
  }
}
