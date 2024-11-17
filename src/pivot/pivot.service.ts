import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Blog } from '../blog/entities/blog.entity';
import { User } from '../user/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PivotService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Blog)
    private readonly blogRepository: Repository<Blog>
  ) {}

  async followUser(user_id: number, follower_id: number): Promise<boolean> {
    const user = await this.userRepository.findOne({ where: { id: user_id }, relations: ['followers'] });
    const follower = await this.userRepository.findOne({ where: { id: follower_id } });

    if (user && follower) {
      user.followers.push(follower);
      await this.userRepository.save(user);
      return true;
    } else {
      return false;
    }
  }

  async unFollowUser(user_id: number, follower_id: number): Promise<boolean> {
    const user = await this.userRepository.findOne({ where: { id: user_id }, relations: ['followers'] });
    const follower = await this.userRepository.findOne({ where: { id: follower_id } });
    if (user && follower) {
      user.followers = user.followers.filter((follower) => follower.id !== follower_id);
      await this.userRepository.save(user);
      return true;
    } else {
      return false;
    }
  }

  async getFollowerCount(username: string): Promise<number> {
    const user = await this.userRepository.findOne({ where: { username: username }, relations: ['following'] });
    return user.following.length;
  }


  async likeBlog(blog_id: number, user_id: number): Promise<boolean> {
    const user = await this.userRepository.findOne({ where: { id: user_id } });
    const blog = await this.blogRepository.findOne({ where: { id: blog_id }, relations: ['likes'] });

    if (user && blog) {
      blog.likes.push(user);
      await this.blogRepository.save(blog);
      return true;
    } else {
      return false;
    }
  }

  async checkFollow(user_id: number, follower_id: number): Promise<any> {
    const user = await this.userRepository.findOne({ where: { id: user_id }, relations: ['followers'] });
    if (user.followers.find((follower) => follower.id === follower_id)) {
      return true;
    } else {
      return false;
    }
  }

  async unLikeBlog(blog_id: number, user_id: number): Promise<boolean> {
    const user = await this.userRepository.findOne({ where: { id: user_id } });
    const blog = await this.blogRepository.findOne({ where: { id: blog_id }, relations: ['likes'] });

    if (user && blog) {
      blog.likes = blog.likes.filter((like) => like.id !== user_id);
      await this.blogRepository.save(blog);
      return true;
    } else {
      return false;
    }
  }

  async getLikesCount(blog_id: number): Promise<number> {
    const blog = await this.blogRepository.findOne({ where: { id: blog_id }, relations: ['likes'] });
    return blog.likes.length;
  }

  async checkLike(blog_id: number, user_id: number): Promise<boolean> {
    const blog = await this.blogRepository.findOne({ where: { id: blog_id }, relations: ['likes'] });
    if (blog.likes.find((like) => like.id === user_id)) {
      return true;
    } else {
      return false;
    }
  }

  async bookmarkBlog(blog_id: number, user_id: number): Promise<boolean> {
    const user = await this.userRepository.findOne({ where: { id: user_id }, relations: ['bookmarks'] });
    const blog = await this.blogRepository.findOne({ where: { id: blog_id } });

    if (user && blog) {
      user.bookmarks.push(blog);
      await this.userRepository.save(user);
      return true;
    } else {
      return false;
    }
  }

  async unBookmarkBlog(blog_id: number, user_id: number): Promise<boolean> {
    const user = await this.userRepository.findOne({ where: { id: user_id }, relations: ['bookmarks'] });
    if (user) {
      user.bookmarks = user.bookmarks.filter((blog) => blog.id !== blog_id);
      await this.userRepository.save(user);
      return true;
    } else {
      return false;
    }
  }
}
