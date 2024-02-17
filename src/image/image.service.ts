import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Image } from './enitities/image.entity';
import { Repository } from 'typeorm';
import { LoggerService } from 'src/services/logger.service';
import { Util } from 'src/util/util';

@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(Image)
    private readonly imageService: Repository<Image>,
    readonly logger: LoggerService,
  ) {
    this.logger.setContext('LoggerService');
  }

  async uploadImages(
    files: Array<Express.Multer.File>,
    id: number,
  ): Promise<void> {
    files.forEach((file) => {
      const namePath = Util.createSlug(file.originalname)
      const data = {
        path: namePath,
        blog: id
      };

      this.imageService.save(data);
    });
  }

  async editImages(
    files: Array<Express.Multer.File>,
    id: number,
  ): Promise<void> {
    files.forEach((file) => {
      const data = {
        path: file.originalname,
        blog_id: id,
      };

      this.imageService.update({ blog: id }, data);
    });
  }
}
