import { UserService } from './user.service';
import { User } from './entities/user.entity';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    create(createUserDto: User): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateUserDto: User): string;
    remove(id: string): string;
}
