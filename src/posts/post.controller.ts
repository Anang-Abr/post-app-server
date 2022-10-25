import {
  HttpException,
  HttpStatus,
  Body,
  Controller,
  Get,
  Post,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dtos/createPost.dto';
import { PostType } from '../utils/types/types';
import { PostEntity } from '../utils/typeorm/post.entity';

@Controller()
export class PostController {
  constructor(private postService: PostService) {}
  @Get()
  fetchAll() {
    return this.postService.fetchAll();
  }

  @Post()
  async create(@Body() createPost: CreatePostDto) {
    console.log('create', createPost);
    const result: PostEntity | null = await this.postService.create(createPost);
    if (!result)
      return new HttpException(
        'database connection error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    return { msg: 'post created successfully', post: result.id };
  }
}
