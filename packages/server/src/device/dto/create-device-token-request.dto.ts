import { ApiProperty } from '@nestjs/swagger';
import { DeviceTypeTagType } from '@alarm2me/dto/dist/device/type/device-type-tag.type';

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
