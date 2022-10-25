import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport/dist/passport.module';
import { LocalStrategy } from '../auth/utils/LocalStrategy';
import { SessionSerializer } from './utils/SessionSerializer';

@Module({
  imports: [UsersModule, PassportModule],
  providers: [AuthService, LocalStrategy, SessionSerializer],
  controllers: [AuthController],
})
export class AuthModule {}
