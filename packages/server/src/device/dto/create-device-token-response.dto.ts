import { CreateDeviceTokenResponseProps } from '@alarm2me/dto/dist/device/props/create-device-token-response.props';
import { DeviceTypeTagType } from '@alarm2me/dto/dist/user/type/device-type-tag.type';

export class CreateDeviceTokenResponseDto
  implements CreateDeviceTokenResponseProps
{
  deviceModel: string;
  deviceTypeTag: DeviceTypeTagType;
  deviceNickname: string;
}
