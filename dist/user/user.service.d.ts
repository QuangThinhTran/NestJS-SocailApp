import { User } from './entities/user.entity';
export declare class UserService {
    create(createUserDto: User): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateUserDto: User): string;
    remove(id: number): string;
}
