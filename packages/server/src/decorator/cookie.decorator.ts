import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Cookie = createParamDecorator(
  (name: string, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();
    return {
      get: () => request.cookie[name],
      set: (value: string) =>
        response.cookie(name, value, {
          httpOnly: true,
          domain: process.env.RUNTIME_DOMAIN,
          maxAge: 1000 * 60 * 60 * 24,
          secure: true,
        }),
    };
  },
);
