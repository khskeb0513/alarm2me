import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { DeviceService } from './device.service';
import { JwtPayloadDto } from '../auth/dto/jwt-payload.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateDeviceTokenRequestDto } from './dto/create-device-token-request.dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtPayload } from '../decorator/jwt-payload.decorator';
import { UpdateDeviceTokenRequestDto } from './dto/update-device-token-request.dto';

@Controller({
  version: '1',
  path: '/device',
})
@ApiTags('device')
export class DeviceController {
  constructor(private readonly deviceService: DeviceService) {}

  @Get('/')
  @UseGuards(JwtAuthGuard)
  public async findAllByUser(@JwtPayload() user: JwtPayloadDto) {
    return this.deviceService.findAllByUserId(user.sub);
  }

  @Get('/deviceToken/:deviceToken')
  public async findByDeviceToken(@Param('deviceToken') deviceToken: string) {
    return this.deviceService.findAllByDeviceToken(deviceToken);
  }

  @Post('/deviceToken/:deviceToken')
  public async updateDeviceToken(
    @Param('deviceToken') deviceToken: string,
    @Body() updateDeviceTokenRequestDto: UpdateDeviceTokenRequestDto,
  ) {
    return this.deviceService.updateDeviceToken(
      deviceToken,
      updateDeviceTokenRequestDto,
    );
  }

  @Get('/:authToken')
  public async findByAuthToken(@Param('authToken') authToken: string) {
    return this.deviceService.findAllByUserId(authToken);
  }

  @Post('/')
  public async create(
    @Body() createDeviceTokenDto: CreateDeviceTokenRequestDto,
  ) {
    return this.deviceService.create(createDeviceTokenDto);
  }
}
