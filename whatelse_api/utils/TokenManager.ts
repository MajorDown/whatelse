import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET;
if (!SECRET_KEY) throw new Error('JWT_SECRET est manquant dans .env');

export type TokenPayload = {
  id: string;
  email: string;
};

class TokenManager {
  /**
   * Génère un token JWT sans expiration
   * @param payload - Données à encoder
   * @returns string - Token JWT signé
   */
  static generate(payload: TokenPayload): string {
    const sign = jwt.sign(payload, SECRET_KEY);
    if (!sign) console.log('TokenManager.generate ~> Erreur lors de la génération du token');
    else console.log('TokenManager.generate ~> Token généré avec succès');
    return sign;
  }

  /**
   * Vérifie et décode un token JWT
   * @param token - Le token à vérifier
   * @returns Le payload décodé si valide, sinon null
   */
  static check(token: string): TokenPayload | null {
    try {
      const verification = jwt.verify(token, SECRET_KEY) as TokenPayload;
      if (!verification) console.log('TokenManager.check ~> Erreur lors de la vérification du token');
      else console.log('TokenManager.check ~> Token validé');
      return verification;
    } catch {
      return null;
    }
  }

  /**
   * Décode un token **sans vérifier la signature**
   * @param token - Le token à décoder
   * @returns Le payload brut ou null
   */
  static decode(token: string): TokenPayload | null {
    try {
      return jwt.decode(token) as TokenPayload;
    } catch {
      return null;
    }
  }
}

export default TokenManager;
