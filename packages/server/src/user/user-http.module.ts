import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserModule } from './user.module';
import { UserAuthTokenService } from './user-auth-token.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [UserModule, HttpModule],
  controllers: [UserController],
  providers: [UserService, UserAuthTokenService],
  exports: [UserService, UserAuthTokenService],
})
export class UserHttpModule {}
