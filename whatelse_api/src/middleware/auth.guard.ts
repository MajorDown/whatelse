import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import TokenManager from '@/utils/TokenManager';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.headers['authorization'];
    const emailHeader = request.headers['x-user-email'];

    if (!authHeader || !emailHeader) {
      console.log('AuthGuard ~> Headers manquants');
      throw new UnauthorizedException('Token ou email manquant');
    }

    const token = authHeader.split(' ')[1];
    const email = Array.isArray(emailHeader) ? emailHeader[0] : emailHeader;

    const payload = TokenManager.check(token);
    if (!payload || payload.email !== email) {
      console.log('AuthGuard ~> Token invalide ou email non cohérent');
      throw new UnauthorizedException('Token invalide');
    }

    return true; // accès autorisé
  }
}
