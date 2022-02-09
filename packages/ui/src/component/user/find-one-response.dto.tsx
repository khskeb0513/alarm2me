import { FindOneResponseProps } from '@alarm2me/dto/dist/user/props/find-one-response.props';

export class FindOneResponseDto implements FindOneResponseProps {
  email: string;
  name: string;
  sub: string;
}
