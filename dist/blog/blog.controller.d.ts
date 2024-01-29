import { BlogService } from './blog.service';
import { Blog } from './entities/blog.entity';
export declare class BlogController {
    private readonly blogService;
    constructor(blogService: BlogService);
    create(createBlogDto: Blog): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateBlogDto: Blog): string;
    remove(id: string): string;
}
