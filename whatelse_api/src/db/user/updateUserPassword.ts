import { PrismaClient } from '@prisma/client';
import { PasswordManager } from 'utils/PasswordManager';

const prisma = new PrismaClient();

/**
 * @description Met à jour le mot de passe d'un utilisateur
 * @param id - ID de l'utilisateur
 * @param newPassword - Nouveau mot de passe en clair
 * @returns boolean - true si mise à jour réussie, false sinon
 */
async function updateUserPassword(id: string, newPassword: string): Promise<boolean> {
  try {
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) {
      console.log(`updateUserPassword ~> Utilisateur introuvable : ${id}`);
      return false;
    }

    const hashedPassword = await PasswordManager.encrypt(newPassword);

    await prisma.user.update({
      where: { id },
      data: { password: hashedPassword },
    });

    return true;
  } catch (error) {
    console.log(`updateUserPassword ~> Erreur pour ${id}`, error);
    return false;
  }
}

export default updateUserPassword;
