import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token: string | undefined = this.extractTokenFromHeader(request);
    if (!token)
      throw new UnauthorizedException('Accès non autorisé à la ressource');
    try {
      const payload = await this.jwtService.verifyAsync(token);
      request['user'] = payload;
    } catch (err) {
      throw new UnauthorizedException('Accès non autorisé à la ressource');
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    console.log(request.headers.authorization);
    return type == 'Bearer' ? token : undefined;
  }
}
