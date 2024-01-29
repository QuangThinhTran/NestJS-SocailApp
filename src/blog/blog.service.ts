import { Injectable } from '@nestjs/common';
import { Blog } from './entities/blog.entity';


@Injectable()
export class BlogService {
  create(createBlogDto: Blog) {
    return 'This action adds a new blog';
  }

  findAll() {
    return `This action returns all blog`;
  }

  findOne(id: number) {
    return `This action returns a #${id} blog`;
  }

  update(id: number, updateBlogDto: Blog) {
    return `This action updates a #${id} blog`;
  }

  remove(id: number) {
    return `This action removes a #${id} blog`;
  }
}
