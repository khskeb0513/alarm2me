import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { Repository } from 'typeorm';
import { GithubOauthEntity } from './entity/github-oauth.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { JwtPayloadDto } from './dto/jwt-payload.dto';
import { Profile } from 'passport-github2';
import { UserAuthTokenService } from '../user/user-auth-token.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly userAuthTokenService: UserAuthTokenService,
    @InjectRepository(GithubOauthEntity)
    private readonly githubTokenEntityRepository: Repository<GithubOauthEntity>,
    private readonly jwtService: JwtService,
  ) {}

  public async validateGithubUser(profile: Profile): Promise<JwtPayloadDto> {
    const githubToken = await this.githubTokenEntityRepository.findOne({
      where: { profileId: profile.id },
    });
    if (!githubToken) {
      const user = await this.userService.create({
        email: profile.emails[0].value,
        photo: profile.photos[0].value,
        displayName: profile.displayName,
      });
      await this.githubTokenEntityRepository.save({
        profileId: profile.id,
        userId: user.id,
      });
      const authToken = await this.userAuthTokenService.create(user.id);
      return {
        name: user.displayName,
        sub: authToken.authToken,
        email: user.email,
      };
    } else {
      const user = await this.userService.findOne(githubToken.userId);
      const authToken = await this.userAuthTokenService.findOne(user.id);
      return {
        name: user.displayName,
        sub: authToken.authToken,
        email: user.email,
      };
    }
  }

  public async validateJwtUser(jwtPayloadDto: JwtPayloadDto) {
    return jwtPayloadDto;
  }

  public async login(jwtPayloadDto: JwtPayloadDto) {
    return {
      access_token: this.jwtService.sign(jwtPayloadDto, {
        secret: process.env.JWT_SECRET,
      }),
    };
  }
}
