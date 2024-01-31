import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) {}

  async create(data: Comment): Promise<Comment> {
    return this.commentRepository.save(data);
  }

  async find(id: number): Promise<Comment> {
    return this.commentRepository.findOne({ where: { id } });
  }

  async findByBlogId(id: number): Promise<Comment[]> {
    return this.commentRepository.find({
      where: {
        blog: { id },
      },
      relations: ['user'],
    });
  }

  async delete(id: number): Promise<void> {
    await this.commentRepository.softDelete(id);
  }
}
