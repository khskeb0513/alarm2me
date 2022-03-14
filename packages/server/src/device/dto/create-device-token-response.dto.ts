import {
  CreateDeviceTokenResponseProps,
  DeviceTypeTagType,
} from '@alarm2me/dto';

export class CreateDeviceTokenResponseDto
  implements CreateDeviceTokenResponseProps
{
  deviceModel: string;
  deviceTypeTag: DeviceTypeTagType;
  deviceNickname: string;
}
