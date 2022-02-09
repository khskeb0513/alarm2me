import { DeviceTypeTagType } from '@alarm2me/dto/dist/user/type/device-type-tag.type';
import { FindAllByUserIdResponseProps } from '@alarm2me/dto/dist/device/props/find-all-by-user-id-response.props';

export class FindAllByUserIdResponseDto
  implements FindAllByUserIdResponseProps
{
  createdAt: string;
  deviceTypeTag: DeviceTypeTagType;
  lastUsed: string;
  deviceModel: string;
  deviceNickname: string;
}
