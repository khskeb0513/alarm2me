import { Controller, Get, Param, Res, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GithubAuthGuard } from './github-auth.guard';
import { AuthService } from './auth.service';
import { JwtPayloadDto } from './dto/jwt-payload.dto';
import { UserService } from '../user/user.service';
import { JwtPayload } from '../decorator/jwt-payload.decorator';
import { Cookie } from '../decorator/cookie.decorator';
import { CookieInterface } from '../decorator/interface/cookie.interface';

@ApiTags('auth')
@Controller({
  path: '/auth',
  version: '1',
})
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @UseGuards(GithubAuthGuard)
  @Get('/github')
  public async login() {
    return;
  }

  @Get('/logout')
  public logout(@Cookie('access_token') accessToken: CookieInterface) {
    accessToken.set(null);
    return;
  }

  @Get('/token/:authToken')
  public async findOneByUserAuthToken(
    @Param('authToken') authToken: string,
    @Cookie('access_token') accessToken: CookieInterface,
    @Res() response,
  ) {
    const user = await this.userService.findByUserAuthToken(authToken);
    const access_token = await this.authService.login({
      sub: authToken,
      email: user.email,
      name: user.displayName,
    });
    await accessToken.set(access_token.access_token);
    return response.status(302).redirect('/');
  }

  @UseGuards(GithubAuthGuard)
  @Get('/github/callback')
  public async githubCallback(
    @JwtPayload() user: JwtPayloadDto,
    @Cookie('access_token') accessToken: CookieInterface,
    @Res() response,
  ) {
    const access_token = await this.authService.login(user);
    await accessToken.set(access_token.access_token);
    return response.status(302).redirect('/');
  }
}
