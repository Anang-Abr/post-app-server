import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { UserService } from 'src/users/user.service';
import { User } from '../../utils/typeorm/user.entity';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private userService: UserService) {
    super();
  }
  async serializeUser(user: User, done: (err, user: User) => void) {
    // console.log('serializing user');
    return done(null, user);
  }

  async deserializeUser(user: User, done: (err, user: User) => void) {
    // console.log('deserializing user');
    const findUser = await this.userService.findUserById(user.id);
    return findUser ? done(null, findUser) : done(null, null);
  }
}
