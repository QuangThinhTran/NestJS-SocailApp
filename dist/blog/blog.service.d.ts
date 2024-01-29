import { Blog } from './entities/blog.entity';
export declare class BlogService {
    create(createBlogDto: Blog): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateBlogDto: Blog): string;
    remove(id: number): string;
}
