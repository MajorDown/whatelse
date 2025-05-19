import { NextFunction, Request, Response } from 'express';
import TokenManager from 'utils/TokenManager';

/**
 * @description Middleware d'authentification
 * @param req - Requête Express
 * @param res - Réponse Express
 * @param next - Fonction de rappel pour passer au middleware suivant
 * @returns {void}
 */
export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers['authorization'];
  const emailHeader = req.headers['x-user-email'];

  if (!authHeader || !emailHeader) {
    console.log('authMiddleware ~> Headers manquants');
    return res.status(401).json({ error: 'Token ou email manquant' });
  }

  const token = authHeader.split(' ')[1];
  const email = Array.isArray(emailHeader) ? emailHeader[0] : emailHeader;

  const payload = TokenManager.check(token);
  if (!payload || (payload as any).email !== email) {
    console.log('authMiddleware ~> Token invalide ou email non cohérent');
    return res.status(401).json({ error: 'Token invalide' });
  }

  (req as any).user = payload;

  next();
}
