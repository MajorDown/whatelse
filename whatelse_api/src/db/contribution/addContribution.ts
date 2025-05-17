import { PrismaClient } from '@prisma/client';
import generateId from 'utils/generateId';

const prisma = new PrismaClient();

/**
 * @description Ajoute un utilisateur comme contributeur à un projet
 * @param userId - ID de l'utilisateur
 * @param projectId - ID du projet
 * @returns boolean - true si succès, false sinon
 */
async function addContribution(userId: string, projectId: string): Promise<boolean> {
  try {
    // Vérifie que le user et le projet existent
    const [user, project] = await Promise.all([
      prisma.user.findUnique({ where: { id: userId } }),
      prisma.project.findUnique({ where: { id: projectId } }),
    ]);

    if (!user || !project) {
      console.log(`addContribution ~> Utilisateur ou projet introuvable`);
      return false;
    }

    // Vérifie si la contribution existe déjà
    const existing = await prisma.contribution.findUnique({
      where: {
        userId_projectId: {
          userId,
          projectId,
        },
      },
    });

    if (existing) {
      console.log(`addContribution ~> Contribution déjà existante`);
      return false;
    }

    await prisma.contribution.create({
      data: {
        id: generateId('contribution'),
        userId,
        projectId,
      },
    });

    console.log(`addContribution ~> Contribution ajoutée pour ${userId} au projet ${projectId}`);
    return true;
  } catch (error) {
    console.log(`addContribution ~> Erreur`, error);
    return false;
  }
}

export default addContribution;
