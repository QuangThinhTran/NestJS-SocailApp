import { Controller, Get, Param, Res } from '@nestjs/common';
import { LoggerService } from '../services/logger.service';
import { BaseController } from '../util/BaseController';
import { Response } from 'express';
import { RatingService } from './rating.service';
import { BlogService } from '../blog/blog.service';

@Controller('rating')
export class RatingController extends BaseController {
  constructor(
    private readonly voteRepository: RatingService,
    private readonly blogRepository: BlogService,
    readonly logger: LoggerService,
  ) {
    super(logger);
    this.logger.setContext('RatingService');
  }

  @Get('/vote/:id/:start')
  async getRating(
    @Param('id') id: number,
    @Param('start') start: number,
    @Res() res: Response,
  ): Promise<void> {
    try {
      const blog = await this.blogRepository.findOne(id);
      const rating = await this.voteRepository.calculateRating(
        blog.rating,
        +start,
      );
      await this.voteRepository.vote(id, rating);
      return this.responseOK('Vote Successful', res);
    } catch (e) {
      this.logger.error(e);
    }
  }
}
