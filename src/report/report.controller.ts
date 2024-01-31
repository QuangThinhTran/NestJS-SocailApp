import { Controller, Get, Post, Body, Param, Res } from '@nestjs/common';
import { ReportService } from './report.service';
import { Report } from './entities/report.entity';
import { BaseController } from 'src/util/BaseController';
import { LoggerService } from 'src/services/logger.service';
import { Messages } from 'src/common/constants/constant';
import { Response } from 'express';

@Controller('report')
export class ReportController extends BaseController {
  constructor(
    private readonly reportService: ReportService,
    readonly logger: LoggerService,
  ) {
    super(logger);
    this.logger.setContext('ReportService');
  }

  @Post('/create')
  async create(@Body() data: Report, @Res() res: Response): Promise<void> {
    try {
      await this.reportService.create(data);
      this.responseCreated(Messages.CREATE_SUCCESS, res);
    } catch (error) {
      this.responseExeption(error);
    }
  }

  @Get('/get-report-by-blog/:id')
  async findReportByBlog(
    @Param('id') id: number,
    @Res() res: Response,
  ): Promise<void> {
    try {
      const data = await this.reportService.findByBlogID(id);
      this.responseWithData('', data, res);
    } catch (error) {
      this.responseExeption(error);
    }
  }

  @Get('/get-report-by-user/:id')
  async findReportByUser(
    @Param('id') id: number,
    @Res() res: Response,
  ): Promise<void> {
    try {
      const data = await this.reportService.findByUserID(id);
      this.responseWithData('', data, res);
    } catch (error) {
      this.responseExeption(error);
    }
  }
}
