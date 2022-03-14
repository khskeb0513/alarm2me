import { FindOneResponseProps } from '@alarm2me/dto';

export class FindOneResponseDto implements FindOneResponseProps {
  name: string;
  email: string;
  sub: string;
}
