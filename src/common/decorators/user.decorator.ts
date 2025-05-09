import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const AuthenticatedUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<{ user?: any }>();
    return request.user as { id: string; name: string }; // Replace with the actual user type
  },
);
