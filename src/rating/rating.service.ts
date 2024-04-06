import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Blog } from '../blog/entities/blog.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RatingService {
  constructor(
    @InjectRepository(Blog)
    readonly blogRepository: Repository<Blog>,
  ) {}

  async vote(id: number, start: number): Promise<Blog> {
    await this.blogRepository.update(id, { rating: start });
    return this.blogRepository.findOneOrFail({ where: { id } });
  }

  async calculateRating(oldRating: number, newRating: number): Promise<number> {
    return (oldRating + newRating) / 2;
  }
}
