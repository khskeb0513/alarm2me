import { DeviceTypeTagType } from '@alarm2me/dto';
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
