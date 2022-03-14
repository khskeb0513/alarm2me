import { FindOneByAuthTokenResponseProps } from '@alarm2me/dto';

export class FindOneByAuthTokenResponseDto
  implements FindOneByAuthTokenResponseProps
{
  createdAt: Date;
  displayName: string;
  email: string;
  photo: string;
}
