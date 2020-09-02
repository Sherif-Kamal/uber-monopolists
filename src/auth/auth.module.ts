import { Module, Global } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import * as config from 'config';
import { JwtStrategy } from './jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './user.schema';
import { UserRepoistory } from './user.repository';
import { users } from './user.seed';

// global module for jwt strategy.
@Global()
  @Module({
    imports: [
      MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
      PassportModule.register({defaultStrategy:'jwt'}),
      JwtModule.register({ secret: config.get('JWT.SECRET') }),
  ],
    providers: [
      {
        provide: 'seedUsers',
        useValue: users
      },
      AuthService, JwtStrategy, UserRepoistory],
  exports:[JwtStrategy,PassportModule],
  controllers: [AuthController]
})
export class AuthModule {}
