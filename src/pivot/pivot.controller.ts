import { Controller, Get, HttpStatus, Param, Request, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { PivotService } from './pivot.service';
import { BaseController } from '../util/BaseController';
import { LoggerService } from '../services/logger.service';
import { UserService } from 'src/user/user.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('pivot')
export class PivotController extends BaseController {
  constructor(
    private readonly pivotService: PivotService,
    private readonly userService: UserService,
    readonly logger: LoggerService,
  ) {
    super(logger);
    this.logger.setContext('PivotService');
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/follower/:follower_email')
  async follow(
    @Param('follower_email') follower_email: string,
    @Request() req,
    @Res() res: Response
  ): Promise<void> {
    try {

      const follower = await this.userService.findByEmail(follower_email);
      const following = await this.pivotService.followUser(req.user.userId, follower.id);

      if (following) {
        this.responseMessage(HttpStatus.OK, 'Followed successfully', res);
        return;
      } else {
        this.responseMessage(HttpStatus.BAD_REQUEST, 'Followed failed', res);
      }

    } catch (e) {
      this.responseException(e);
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/unfollow/:follower_email')
  async unfollow(
    @Param('follower_email') follower_email: string,
    @Request() req,
    @Res() res: Response
  ): Promise<void> {
    try {
      const follower = await this.userService.findByEmail(follower_email);
      const unfollowing = await this.pivotService.unFollowUser(req.user.userId, follower.id);

      if (unfollowing) {
        this.responseMessage(HttpStatus.OK, 'Unfollowed successfully', res);
        return;
      } else {
        this.responseMessage(HttpStatus.BAD_REQUEST, 'Unfollowed failed', res);
      }
    } catch (e) {
      this.responseException(e);
    }
  }

  @Get('/count-followers/:username')
  async getFollowerCount(
    @Param('username') username: string,
    @Res() res: Response
  ): Promise<void> {
    try {
      const count = await this.pivotService.getFollowerCount(username);
      this.responseWithData('', count, res);
    } catch (e) {
      this.responseException(e);
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/check-follow/:follower_email')
  async checkFollow(
    @Param('follower_email') follower_email: string,
    @Request() req,
    @Res() res: Response
  ): Promise<void> {
    try {
      const follower = await this.userService.findByEmail(follower_email);
      const isFollowing = await this.pivotService.checkFollow(req.user.userId, follower.id);
      this.responseWithData('', isFollowing, res);
    } catch (e) {
      this.responseException(e);
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/like-blog/:blog_id')
  async likeBlog(
    @Param('blog_id') blog_id: number,
    @Request() req,
    @Res() res: Response
  ): Promise<void> {
    try {
      const liked = await this.pivotService.likeBlog(blog_id, req.user.userId);
      if (liked) {
        this.responseMessage(HttpStatus.OK, 'Liked successfully', res);
        return;
      } else {
        this.responseMessage(HttpStatus.BAD_REQUEST, 'Liked failed', res);
      } 
    } catch (e) {
      this.responseException(e);
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/unlike-blog/:blog_id')
  async unlikeBlog(
    @Param('blog_id') blog_id: number,
    @Request() req,
    @Res() res: Response
  ): Promise<void> {
    try {
      const unliked = await this.pivotService.unLikeBlog(blog_id, req.user.userId);
      if (unliked) {
        this.responseMessage(HttpStatus.OK, 'Unliked successfully', res);
        return;
      } else {
        this.responseMessage(HttpStatus.BAD_REQUEST, 'Unliked failed', res);
      }
    } catch (e) {
      this.responseException(e);
    }
  }

  @Get('/count-likes/:blog_id')
  async getLikesCount(
    @Param('blog_id') blog_id: number,
    @Res() res: Response
  ): Promise<void> {
    try {
      const count = await this.pivotService.getLikesCount(blog_id);
      this.responseWithData('', count, res);
    } catch (e) {
      this.responseException(e);
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/check-like/:blog_id')
  async checkLike(
    @Param('blog_id') blog_id: number,
    @Request() req,
    @Res() res: Response
  ): Promise<void> {
    try {
      const isLiked = await this.pivotService.checkLike(blog_id, req.user.userId);
      this.responseWithData('', isLiked, res);
    } catch (e) {
      this.responseException(e);
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/bookmark-blog/:blog_id')
  async bookmarkBlog(
    @Param('blog_id') blog_id: number,
    @Request() req,
    @Res() res: Response
  ): Promise<void> {
    try {
      const bookmarked = await this.pivotService.bookmarkBlog(blog_id, req.user.userId);
      if (bookmarked) {
        this.responseMessage(HttpStatus.OK, 'Bookmarked successfully', res);
        return;
      } else {
        this.responseMessage(HttpStatus.BAD_REQUEST, 'Bookmarked failed', res);
      }
    } catch (e) {
      this.responseException(e);
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/unbookmark-blog/:blog_id')
  async unBookmarkBlog(
    @Param('blog_id') blog_id: number,
    @Request() req,
    @Res() res: Response
  ): Promise<void> {
    try {
      const unbookmarked = await this.pivotService.unBookmarkBlog(blog_id, req.user.userId);
      if (unbookmarked) {
        this.responseMessage(HttpStatus.OK, 'Unbookmarked successfully', res);
        return;
      } else {
        this.responseMessage(HttpStatus.BAD_REQUEST, 'Unbookmarked failed', res);
      }
    } catch (e) {
      this.responseException(e);
    }
  }
}
