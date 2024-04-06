import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentChild } from './entities/commentChild.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CommentChildService {
  constructor(
    @InjectRepository(CommentChild)
    private readonly commentChildRepository: Repository<CommentChild>,
  ) {}

  async create(data: CommentChild): Promise<CommentChild> {
    return this.commentChildRepository.save(data);
  }

  async getCommentChildByID(id: number): Promise<any> {
    return id;
    // return this.commentChildRepository.find({
    //   where: {
    //     comment: { id },
    //   },
    // });
  }
}
