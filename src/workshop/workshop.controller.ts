import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { WorkshopService } from './workshop.service';
import { Workshop } from './entities/workshop.entity';
import { BaseController } from '../util/BaseController';
import { LoggerService } from '../services/logger.service';
import { Messages } from '../common/constants/constant';
import { Response } from 'express';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { multerOption } from '../services/multer.service';

@Controller('workshop')
export class WorkshopController extends BaseController {
  constructor(
    private readonly workshopService: WorkshopService,
    readonly logger: LoggerService,
  ) {
    super(logger);
    this.logger.setContext('WorkshopService');
  }

  @Post('/create')
  @UseInterceptors(FileInterceptor('image', multerOption))
  async create(
    @Body() data: Workshop,
    @UploadedFile() file: Express.Multer.File,
    @Res() res: Response,
  ): Promise<void> {
    try {
      const workshop = await this.workshopService.create(data, file);
      return this.responseWithData(Messages.CREATE_SUCCESS, workshop, res);
    } catch (e) {
      this.responseException(e);
    }
  }

  @Get('/:id')
  async findOne(@Param('id') id: number, @Res() res: Response): Promise<void> {
    try {
      const workshop = await this.workshopService.findOne(+id);
      return this.responseWithData('', workshop, res);
    } catch (e) {
      this.responseException(e);
    }
  }

  @Patch('/:id')
  @UseInterceptors(FilesInterceptor('image', 1, multerOption))
  async update(
    @Param('id') id: number,
    @Body() data: Workshop,
    @Res() res: Response,
  ): Promise<void> {
    try {
      const workshops = await this.workshopService.update(+id, data);
      return this.responseWithData('', workshops, res);
    } catch (e) {
      this.responseException(e);
    }
  }

  @Get('/:slug')
  async getWorkshopBySlug(@Param('slug') slug: string, @Res() res: Response) {
    try {
      const workshop = await this.workshopService.findBySlug(slug);
      return this.responseWithData('', workshop, res);
    } catch (e) {
      this.responseException(e);
    }
  }

  @Delete('/:id')
  async remove(@Param('id') id: number): Promise<void> {
    try {
      await this.workshopService.findOne(id);
      await this.workshopService.remove(id);
    } catch (e) {
      this.responseException(e);
    }
  }
}
