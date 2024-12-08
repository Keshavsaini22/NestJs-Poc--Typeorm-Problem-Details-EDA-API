import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { BadRequest } from '../exceptions/exceptions';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private readonly configService: ConfigService
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new BadRequest('Unauthorized - Token not provided');
    }
    try {
      const payload = await this.jwtService.verifyAsync(
        token,
        {
          secret: this.configService.get<string>('JWT_SECRET')
        }
      );
      request['user'] = payload;
    } catch {
      throw new BadRequest('Unauthorized - Invalid token');
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const authorizationHeader = request.headers.authorization;
    const cookieToken = request.cookies?.jwt;

    if (authorizationHeader) {
      const [type, token] = authorizationHeader.split(' ') ?? [];
      if (type === 'Bearer') {
        return token;
      }
    }

    return cookieToken;
  }
}
