import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entity/user.entity';
import { UserAuthTokenEntity } from './entity/user-auth-token.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, UserAuthTokenEntity])],
  exports: [TypeOrmModule],
})
export class UserModule {}
