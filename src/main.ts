import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';
import { DataSource } from 'typeorm';
import { Session } from './utils/typeorm/session.entity';
import { TypeormStore } from 'connect-typeorm/out';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
  });
  app.useGlobalPipes(new ValidationPipe());

  const dataSource = app.get(DataSource);
  const sessionRepository = dataSource.getRepository(Session);
  app.use(
    session({
      name: 'postAppSession',
      secret: 'sessionRahasia',
      saveUninitialized: false,
      cookie: {
        maxAge: 300000,
        httpOnly: false,
      },
      store: new TypeormStore().connect(sessionRepository),
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());
  await app.listen(3001);
}
bootstrap();
