import { FindOneResponseProps } from '@alarm2me/dto';

export class FindOneResponseDto implements FindOneResponseProps {
  email: string;
  name: string;
  sub: string;
}
