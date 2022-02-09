import { FindOneByAuthTokenResponseProps } from '@alarm2me/dto/dist/user/props/find-one-by-auth-token-response.props';

export class FindOneByAuthTokenResponseDto
  implements FindOneByAuthTokenResponseProps
{
  createdAt: Date;
  displayName: string;
  email: string;
  photo: string;
}
