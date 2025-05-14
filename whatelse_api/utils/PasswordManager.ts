import bcrypt from 'bcrypt';

/**
 * Classe utilitaire pour gérer les mots de passe (hash + vérification)
 */
export class PasswordManager {
private static readonly saltRounds = parseInt(process.env.SALT_ROUNDS || '10', 10);

  /**
   * Hash un mot de passe brut
   * @param plainPassword - mot de passe non chiffré
   * @returns string - mot de passe hashé
   */
  static async encrypt(plainPassword: string): Promise<string> {
    const result = await bcrypt.hash(plainPassword, this.saltRounds);
    if (!result) console.log('PasswordManager.encrypt ~> Erreur lors du hashage du mot de passe');
    else console.log('PasswordManager.encrypt ~> Mot de passe crypté avec succès');
    return result;
  }

  /**
   * Vérifie qu'un mot de passe brut correspond à un hash
   * @param plainPassword - mot de passe non chiffré
   * @param hashedPassword - hash existant
   * @returns boolean - true si correspondance
   */
  static async check(plainPassword: string, hashedPassword: string): Promise<boolean> {
    const result = await bcrypt.compare(plainPassword, hashedPassword);
    if (!result) console.log('PasswordManager.check ~> Erreur lors de la vérification du mot de passe');
    else console.log('PasswordManager.check ~> Mot de passe validé');
    return result;
  }
}
