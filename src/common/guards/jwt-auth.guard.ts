import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { Request } from 'express';

interface JwtPayload {
  role: string;
  [key: string]: any; // Add other properties as needed
}

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.headers['authorization'];

    // Check if the Authorization header is present
    if (!authHeader) {
      throw new UnauthorizedException('Authorization header is missing');
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException(
        'Token is missing in the Authorization header',
      );
    }

    try {
      const payload = this.jwtService.verify<JwtPayload>(token);

      // Check if the user's role is allowed
      if (roles && !roles.includes(payload.role)) {
        throw new UnauthorizedException(
          'You do not have access to this resource',
        );
      }

      // Attach user info to the request
      request.user = payload;
      return true;
    } catch {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
