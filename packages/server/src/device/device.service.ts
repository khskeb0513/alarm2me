import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeviceTokenEntity } from './entity/device-token.entity';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import { CreateDeviceTokenRequestDto } from './dto/create-device-token-request.dto';
import * as randomSlugs from 'random-word-slugs';
import { CreateDeviceTokenResponseDto } from './dto/create-device-token-response.dto';

@Injectable()
export class DeviceService {
  constructor(
    @InjectRepository(DeviceTokenEntity)
    private readonly deviceTokenEntityRepository: Repository<DeviceTokenEntity>,
    private readonly userService: UserService,
  ) {}

  public async updateLastUsed(deviceNickname: string) {
    return this.deviceTokenEntityRepository.update(
      { deviceNickname },
      { lastUsed: new Date() },
    );
  }

  public async create(
    createDeviceTokenDto: CreateDeviceTokenRequestDto,
  ): Promise<CreateDeviceTokenResponseDto> {
    const user = await this.userService.findByUserAuthToken(
      createDeviceTokenDto.userAuthToken,
    );
    const response = await this.deviceTokenEntityRepository.save({
      deviceModel: createDeviceTokenDto.deviceModel,
      deviceTypeTag: createDeviceTokenDto.deviceTypeTag,
      userId: { id: user.id },
      token: createDeviceTokenDto.deviceToken,
      deviceNickname:
        createDeviceTokenDto.deviceModel + '-' + randomSlugs.generateSlug(2),
    });
    return {
      deviceModel: response.deviceModel,
      deviceTypeTag: response.deviceTypeTag,
      deviceNickname: response.deviceNickname,
    };
  }

  public async findByDeviceNamesAndUserId(
    userId: number,
    deviceNicknames: string[],
  ) {
    return this.deviceTokenEntityRepository.find({
      where: deviceNicknames.map((deviceNickname) => ({
        deviceNickname,
        userId: { id: userId },
      })),
    });
  }

  public async findAllByDeviceToken(deviceToken: string) {
    const response = await this.deviceTokenEntityRepository.find({
      where: { token: deviceToken },
      select: [
        'token',
        'deviceNickname',
        'deviceModel',
        'deviceTypeTag',
        'createdAt',
        'lastUsed',
      ],
      relations: ['userId'],
    });
    return response.map((row) => ({
      ...row,
      userId: { email: row.userId.email, displayName: row.userId.displayName },
    }));
  }

  public async findAllByUserId(userAuthToken: string) {
    const user = await this.userService.findByUserAuthToken(userAuthToken);
    if (!user) return null;
    return this.deviceTokenEntityRepository.find({
      where: {
        userId: user.id,
      },
      select: [
        'deviceModel',
        'deviceTypeTag',
        'createdAt',
        'lastUsed',
        'deviceNickname',
      ],
    });
  }
}
