import {
  Body,
  Controller,
  Post,
  Request,
  Session,
  UseGuards,
} from '@nestjs/common';
import { throwIfEmpty } from 'rxjs';
import { UserService } from 'src/users/user.service';
import { CreateUserDto, ValidateUserDto } from './utils/dtos/dtos';
import { LocalAuthGuard, AuthenticatedGuard } from './utils/Guards';

@Controller('auth')
export class AuthController {
  constructor(private userService: UserService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@Request() req) {
    return JSON.stringify({
      expires_in: req.session.cookie.expires,
      sessionId: req.session.id,
    });
    // return req.user;
  }
  @Post('register')
  async register(@Body() createUser: CreateUserDto) {
    console.log(createUser);
    return this.userService.createUser(createUser);
  }

  @Post('guarded')
  @UseGuards(AuthenticatedGuard)
  async protected() {
    return 'not protected well enough';
  }
}
