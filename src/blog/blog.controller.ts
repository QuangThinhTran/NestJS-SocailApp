import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  HttpStatus,
  UploadedFile,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { BlogService } from './blog.service';
import { Blog } from './entities/blog.entity';
import { LoggerService } from 'src/services/logger.service';
import { BaseController } from 'src/util/BaseController';
import { Messages } from 'src/common/constants/constant';
import { Response } from 'express';
import { FilesInterceptor } from '@nestjs/platform-express';
import { multerOption } from 'src/services/multer.service';
import { ImageService } from 'src/image/image.service';

interface IFile {
  path: Express.Multer.File
}

@Controller('blog')
export class BlogController extends BaseController {
  constructor(
    private readonly blogService: BlogService,
    readonly imageService: ImageService,
    readonly logger: LoggerService
  ) {
    super(logger);
  }

  @Post('/create')
  @UseInterceptors(FilesInterceptor('path', 8, multerOption))
  async create(
    @Body() blog: Blog,
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Res() res: Response,
  ): Promise<void> {
    try {
      const data = await this.blogService.create(blog);
      await this.imageService.uploadImages(files, data.id)

      this.responseWithData(Messages.CREATE_SUCCESS, data, res);
    } catch (error) {
      this.responseExeption(error);
    }
  }

  @Get(':slug')
  async findOne(
    @Param('slug') slug: string,
    @Res() res: Response,
  ): Promise<Blog> {
    try {
      const data = await this.blogService.findBySlug(slug);
      if (!data) {
        this.responseNotFound(Messages.NOT_FOUND, res);
        return;
      }
      this.responseWithData('', data, res);
    } catch (error) {
      this.responseExeption(error);
    }
    return this.blogService.findBySlug(slug);
  }

  @Patch(':id')
  @UseInterceptors(FilesInterceptor('path', 8, multerOption))
  async update(
    @Param('id') id: string,
    @Body() blog: Blog,
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Res() res: Response,
  ): Promise<void> {
    try {
      const data = await this.blogService.update(+id, blog);
      await this.imageService.editImages(files, data.id)

      this.responseWithData(Messages.CREATE_SUCCESS, data, res);
    } catch (error) {
      this.responseExeption(error);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response): Promise<void> {
    try {
      await this.blogService.remove(+id);
      this.reponseMessage(HttpStatus.OK, Messages.DELETE_SUCCESS, res);
    } catch (error) {
      this.responseExeption(error);
    }
  }
}
