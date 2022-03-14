import { DeviceTypeTagType, FindAllByUserIdResponseProps } from '@alarm2me/dto';

export class FindAllByUserIdResponseDto
  implements FindAllByUserIdResponseProps
{
  createdAt: string;
  deviceTypeTag: DeviceTypeTagType;
  lastUsed: string;
  deviceModel: string;
  deviceNickname: string;
}
