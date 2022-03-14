import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreateMessageRequestProps, OnclickEnum } from '@alarm2me/dto';

export class CreateMessageRequestDto implements CreateMessageRequestProps {
  @ApiProperty()
  title: string;
  @ApiProperty()
  @IsString()
  body: string;
  @ApiProperty()
  image: string;
  @ApiProperty()
  onclick: OnclickEnum;
}
