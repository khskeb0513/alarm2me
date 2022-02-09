import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { Strategy } from 'passport-github2';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor(private readonly authService: AuthService) {
    super(
      {
        clientID: process.env.OAUTH_GITHUB_ID,
        clientSecret: process.env.OAUTH_GITHUB_SECRET,
        callbackURL: `${process.env.RUNTIME_URL}/v1/auth/github/callback`,
        scope: ['user:email'],
      },
      (accessToken, refreshToken, profile, verified) => {
        return this.authService
          .validateGithubUser(profile)
          .then((user) => verified(null, user));
      },
    );
  }
}
