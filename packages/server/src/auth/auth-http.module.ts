import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserHttpModule } from '../user/user-http.module';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { GithubStrategy } from './github.strategy';
import { AuthModule } from './auth.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    UserHttpModule,
    PassportModule,
    AuthModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: '1d',
      },
    }),
  ],
  providers: [AuthService, GithubStrategy, JwtStrategy],
  controllers: [AuthController],
})
export class AuthHttpModule {}
