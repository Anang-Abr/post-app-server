import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsModule } from './posts/posts.module';
import { PostEntity } from './utils/typeorm/post.entity';
import { AuthModule } from './auth/auth.module';
import { User } from './utils/typeorm/user.entity';
import { Session } from './utils/typeorm/session.entity';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    UsersModule,
    PassportModule.register({ session: true }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'post_app',
      entities: [PostEntity, User, Session],
      synchronize: true,
    }),
    PostsModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
