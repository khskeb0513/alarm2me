import { CreateMessageRequestProps } from '@alarm2me/dto/dist/message/props/create-message-request.props';
import { OnclickEnum } from '@alarm2me/dto/dist/message/enum/onclick.enum';
import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

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
