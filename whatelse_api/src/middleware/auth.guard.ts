import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import TokenManager from '@/utils/TokenManager';

// Extension de la Request de Express pour y ajouter la propriété user
declare module 'express-serve-static-core' {
  interface Request {
    user?: { id: string; email: String};
  }
}

/**
 * @description middleware d'authentification
 * permet de vérifier la présence d'un token et d'un email dans les headers de la requête
 * et de valider le token
 * @return boolean
 * @throws UnauthorizedException si le token est invalide ou si l'email ne correspond pas
 */
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

    request.user = payload; // Ajout du payload à la requête pour un accès ultérieur
    return true; // accès autorisé
  }
}
