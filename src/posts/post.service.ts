import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository, TypeOrmModule } from '@nestjs/typeorm';
import { throws } from 'assert';
import { PostEntity } from 'src/utils/typeorm/post.entity';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dtos/createPost.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private postRepository: Repository<PostEntity>,
  ) {}
  fetchAll(): Promise<PostEntity[]> {
    return this.postRepository.find();
  }

  async create(newPost: CreatePostDto) {
    try {
      await this.postRepository.create(newPost);
      return await this.postRepository.save(newPost);
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}
