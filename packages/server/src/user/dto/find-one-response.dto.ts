import { FindOneResponseProps } from '@alarm2me/dto/dist/user/props/find-one-response.props';

export class FindOneResponseDto implements FindOneResponseProps {
  name: string;
  email: string;
  sub: string;
}
