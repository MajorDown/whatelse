import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * @description Supprime la contribution d'un utilisateur à un projet
 * @param userId - ID du contributeur
 * @param projectId - ID du projet
 * @returns boolean - true si succès, false sinon
 */
async function removeContribution(userId: string, projectId: string): Promise<boolean> {
  try {
    await prisma.contribution.delete({
      where: {
        userId_projectId: {
          userId,
          projectId,
        },
      },
    });

    console.log(`removeContribution ~> Contribution supprimée pour ${userId} du projet ${projectId}`);
    return true;
  } catch (error) {
    console.log(`removeContribution ~> Erreur`, error);
    return false;
  }
}

export default removeContribution;
