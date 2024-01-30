import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Image } from './enitities/image.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(Image)
    private readonly imageService: Repository<Image>,
  ) { }

  async uploadImages(files: Array<Express.Multer.File>, id: number): Promise<void> {
    files.forEach((file) => {
      const data = {
        path: file.originalname,
        blog_id: id,
      };

      this.imageService.save(data);
    });
  }

  async editImages(files: Array<Express.Multer.File>, id: number): Promise<void> {
    files.forEach((file) => {
      const data = {
        path: file.originalname,
        blog_id: id,
      };

      this.imageService.update({ blog_id: id }, data);
    });
  }
}
