import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Auth } from './entities/auth.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly authRepository: Repository<User>,
    private readonly JWT: JwtService,
  ) {}

  async register(user: User): Promise<User> {
    const hashPassword = await bcrypt.hash(user.password, 10);
    const data = { ...user, password: hashPassword };
    return this.authRepository.save(data);
  }

  async login(auth: Auth, user: User): Promise<any | boolean> {
    const verifyLogin = await bcrypt.compare(auth.password, user.password);
    if (!verifyLogin) {
      return false;
    }

    return {
      name: user.username,
      email: user.email,
      token: this.JWT.sign({ ...auth, id: user.id }),
    };
  }

  async verifyPassword(oldPassword: string, user: User): Promise<boolean> {
    const verifyPassword = await bcrypt.compare(oldPassword, user.password);
    if (!verifyPassword) {
      return false;
    }
    return true;
  }

  async updatePassword(newPassword: string): Promise<Auth> {
    return this.authRepository.save({ password: newPassword });
  }
}
