import {
  Body,
  Controller,
  Get,
  Param,
  ParseArrayPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { MessageService } from './message.service';
import { CreateMessageRequestDto } from './dto/create-message-request.dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { JwtPayload } from '../decorator/jwt-payload.decorator';
import { JwtPayloadDto } from '../auth/dto/jwt-payload.dto';

@Controller({
  path: '/message',
  version: '1',
})
@ApiTags('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post('/:authToken')
  public async create(
    @Body() createMessageRequestDto: CreateMessageRequestDto,
    @Query('to', new ParseArrayPipe({ items: String, separator: ',' }))
    to: string[],
    @Param('authToken') authToken: string,
  ) {
    return this.messageService.create(authToken, to, createMessageRequestDto);
  }

  @Get('/test/:deviceNickname')
  @UseGuards(JwtAuthGuard)
  public async testMessage(
    @Param('deviceNickname') deviceNickname: string,
    @JwtPayload() user: JwtPayloadDto,
  ) {
    return this.messageService.testMessage(user.sub, deviceNickname);
  }
}
