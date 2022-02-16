import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { messaging } from 'firebase-admin';
import { CreateMessageRequestDto } from './dto/create-message-request.dto';
import { isNotEmpty, isURL } from 'class-validator';
import { DeviceService } from '../device/device.service';
import { OnclickEnum } from '@alarm2me/dto/dist/message/enum/onclick.enum';
import { UserService } from '../user/user.service';
import Message = messaging.Message;

@Injectable()
export class MessageService {
  constructor(
    private readonly deviceService: DeviceService,
    private readonly userService: UserService,
  ) {}

  private messaging = admin.messaging();

  public async create(
    authToken: string,
    to: string[],
    createMessageRequestDto: CreateMessageRequestDto,
  ) {
    if (
      isNotEmpty(createMessageRequestDto.image) &&
      !isURL(createMessageRequestDto.image)
    ) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'image must be a valid URL string',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    const user = await this.userService.findByUserAuthToken(authToken);
    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'invalid auth token',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    const tokens = to.includes('all')
      ? await this.deviceService.findAllByUserId(user.id)
      : await this.deviceService.findByDeviceNamesAndUserId(user.id, to);
    const payloads: Message[] = tokens.map((to) => {
      return {
        notification: {
          title: !createMessageRequestDto.title
            ? ''
            : createMessageRequestDto.title,
          imageUrl: !createMessageRequestDto.image
            ? 'https://upload.wikimedia.org/wikipedia/commons/c/ca/1x1.png'
            : createMessageRequestDto.image,
          body: !createMessageRequestDto.body
            ? ''
            : createMessageRequestDto.body,
        },
        token: to.token,
      };
    });
    if (payloads.length === 0) {
      return null;
    } else {
      const response = await this.messaging.sendAll(payloads);
      await Promise.all(
        tokens.map((token) =>
          this.deviceService.updateLastUsed(token.deviceNickname),
        ),
      );
      return {
        successCount: response.successCount,
        failureCount: response.failureCount,
      };
    }
  }

  public async testMessage(authToken: string, deviceNickname: string) {
    return this.create(authToken, [deviceNickname], {
      title: 'Test Notification',
      body: 'Body Text',
      image: process.env.RUNTIME_URL + '/logo-296.png',
      onclick: OnclickEnum.CLIPBOARD,
    });
  }
}
