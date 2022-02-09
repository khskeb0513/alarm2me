import { OnclickEnum } from '../enum/onclick.enum';

export interface CreateMessageRequestProps {
  title: string;
  body: string;
  image: string;
  onclick: OnclickEnum;
}
