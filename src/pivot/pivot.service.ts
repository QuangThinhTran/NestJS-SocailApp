import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Blog } from '../blog/entities/blog.entity';
import { User } from '../user/entities/user.entity';
import { Workshop } from '../workshop/entities/workshop.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PivotService {
  constructor(
    @InjectRepository(Blog)
    private readonly blogRepository: Repository<Blog>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Workshop)
    private readonly workshopRepository: Repository<Workshop>,
  ) {}

  // async followUser(data: Follower): Promise<any> {
  //   return this.userRepository.save({ data });
  // }
}
