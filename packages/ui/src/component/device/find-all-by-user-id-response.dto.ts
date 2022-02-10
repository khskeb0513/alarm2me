import { FindAllByUserIdResponseProps } from '@alarm2me/dto/dist/device/props/find-all-by-user-id-response.props';
import { DeviceTypeTagType } from '@alarm2me/dto/dist/device/type/device-type-tag.type';

export class FindAllByUserIdResponseDto
  implements FindAllByUserIdResponseProps
{
  createdAt: string;
  deviceTypeTag: DeviceTypeTagType;
  lastUsed: string;
  deviceModel: string;
  deviceNickname: string;
}
