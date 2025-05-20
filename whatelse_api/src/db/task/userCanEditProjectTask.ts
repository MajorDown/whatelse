import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * @description Vérifie si l'utilisateur est le créateur ou un contributeur du projet
 * @param userId - ID de l'utilisateur connecté
 * @param projectId - ID du projet
 * @returns true si l'utilisateur peut modifier le projet
 */
async function userCanEditProjectTask(userId: string, projectId: string): Promise<boolean> {
  // Vérifie s’il est créateur
  const project = await prisma.project.findUnique({
    where: { id: projectId },
    select: { creatorId: true },
  });

  if (!project) return false;
  if (project.creatorId === userId) return true;

  // Vérifie s’il est contributeur
  const contribution = await prisma.contribution.findUnique({
    where: {
      userId_projectId: {
        userId,
        projectId,
      },
    },
  });

  return !!contribution;
}

export default userCanEditProjectTask;
