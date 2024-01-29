import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    readonly userRepository: Repository<User>
  ) { }

  findAll() {
    return `This action returns all user`;
  }

  async findOne(id: number): Promise<User> {
    return this.userRepository.findOne({ where: { id } })
  }

  async findByUsername(username: string): Promise<User> {
    return this.userRepository.findOne({ where: { username: username } })
  }

  update(id: number, updateUserDto: User) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
