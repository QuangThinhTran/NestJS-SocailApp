import { Controller, Get } from '@nestjs/common';
import { PivotService } from './pivot.service';
import { BaseController } from '../util/BaseController';
import { LoggerService } from '../services/logger.service';

@Controller('pivot')
export class PivotController extends BaseController {
  constructor(
    private readonly pivotService: PivotService,
    readonly logger: LoggerService,
  ) {
    super(logger);
    this.logger.setContext('PivotService');
  }

  @Get('/:follower_id/:user_id')
  async follow(): Promise<void> {
    try {
    } catch (e) {
      this.responseException(e);
    }
  }

  @Get('/:workshop_id/:user_id')
  async interested(): Promise<void> {
    try {
    } catch (e) {
      this.responseException(e);
    }
  }

  @Get('/:blog_id/:user_id')
  async likeBlog(): Promise<void> {
    try {
    } catch (e) {
      this.responseException(e);
    }
  }
}
