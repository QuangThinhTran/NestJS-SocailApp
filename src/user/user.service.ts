import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { updateDescription } from './entities/update-description';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: number): Promise<User> {
    return this.userRepository.findOneOrFail({ where: { id } });
  }

  async findByUsername(username: string): Promise<User> {
    return this.userRepository.findOne({
      where: { username },
      relations: ['blog'],
    });
  }

  async findByEmail(email: string): Promise<User> {
    return this.userRepository.findOneOrFail({ where: { email } });
  }

  async update(id: number, user: updateDescription): Promise<User> {
    await this.userRepository.update(id, user);
    return this.userRepository.findOneOrFail({ where: { id } });
  }

  async search(name: string, email: string): Promise<User[]> {
    return this.userRepository.find({
      where: [
        { name: Like(`%${name}%`) },
        { email: Like(`%${email}%`) },
      ],
    });
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
