import { ApiProperty } from '@nestjs/swagger';

export class UpdateDeviceTokenRequestDto {
  @ApiProperty()
  newToken: string;
}
