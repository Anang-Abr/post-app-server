import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/utils/typeorm/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  createUser(userParams: any): Promise<any> {
    this.userRepository.create(userParams);
    return this.userRepository.save(userParams);
  }

  findUserByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({ where: { email: email } });
  }

  findUserByUname(username: string): Promise<User> {
    return this.userRepository.findOne({ where: { username: username } });
  }
  findUserById(id: string): Promise<User> {
    return this.userRepository.findOne({ where: { id: id } });
  }
}
