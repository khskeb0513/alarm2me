import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeviceTokenEntity } from './entity/device-token.entity';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import { CreateDeviceTokenRequestDto } from './dto/create-device-token-request.dto';
import * as randomSlugs from 'random-word-slugs';
import { CreateDeviceTokenResponseDto } from './dto/create-device-token-response.dto';
import { UpdateDeviceTokenRequestDto } from './dto/update-device-token-request.dto';
import { customAlphabet } from 'nanoid';

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

  private nanoid = customAlphabet('6789BCDFGHJKLMNPQRTWbcdfghjkmnpqrtwz', 6);

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
        createDeviceTokenDto.deviceModel +
        '-' +
        randomSlugs.generateSlug(2) +
        '-' +
        this.nanoid(),
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

  public async updateDeviceToken(
    deviceToken: string,
    updateDeviceTokenRequestDto: UpdateDeviceTokenRequestDto,
  ) {
    return this.deviceTokenEntityRepository.update(
      { token: deviceToken },
      { token: updateDeviceTokenRequestDto.newToken },
    );
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

  public async findAllByUserId(id: number) {
    return this.deviceTokenEntityRepository.find({
      where: {
        userId: id,
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

  public async findAllByUserAuthToken(userAuthToken: string) {
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
