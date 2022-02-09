import {
  Controller,
  Get,
  Param,
  UseGuards,
  Req,
  Res,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { FindOneResponseDto } from './dto/find-one-response.dto';
import { FindOneByAuthTokenResponseDto } from './dto/find-one-by-auth-token-response.dto';
import { JwtPayloadDto } from '../auth/dto/jwt-payload.dto';
import { JwtPayload } from '../decorator/jwt-payload.decorator';

@ApiTags('user')
@Controller({
  path: '/user',
  version: '1',
})
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/')
  @UseGuards(JwtAuthGuard)
  findOne(@Req() request): FindOneResponseDto {
    return request.user;
  }

  @Get('/token/create')
  @UseGuards(JwtAuthGuard)
  public async createAuthLink(
    @JwtPayload() user: JwtPayloadDto,
    @Res() response,
  ) {
    return response.redirect(await this.userService.createAuthLink(user.sub));
  }

  @Get(['/token/:authToken', '/:authToken'])
  public async findOneByUserAuthToken(
    @Param('authToken') authToken: string,
  ): Promise<FindOneByAuthTokenResponseDto> {
    const response = await this.userService.findByUserAuthToken(authToken);
    if (!response) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'invalid auth token',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    return {
      email: response.email,
      photo: response.photo,
      displayName: response.displayName,
      createdAt: response.createdAt,
    };
  }
}
