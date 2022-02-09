import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtPayloadDto } from '../auth/dto/jwt-payload.dto';

export const JwtPayload = createParamDecorator(
  (data: any, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    const user: JwtPayloadDto = request.user;
    return user;
  },
);
