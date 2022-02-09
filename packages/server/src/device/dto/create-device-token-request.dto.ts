import { DeviceTypeTagType } from '@alarm2me/dto/dist/user/type/device-type-tag.type';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDeviceTokenRequestDto {
  @ApiProperty()
  userAuthToken: string;
  @ApiProperty()
  deviceModel: string;
  @ApiProperty()
  deviceToken: string;
  @ApiProperty({ type: 'DeviceTypeTagType' })
  deviceTypeTag: DeviceTypeTagType;
}
