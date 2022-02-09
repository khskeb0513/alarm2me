import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GithubOauthEntity } from './entity/github-oauth.entity';

@Module({
  imports: [TypeOrmModule.forFeature([GithubOauthEntity])],
  exports: [TypeOrmModule],
})
export class AuthModule {}
