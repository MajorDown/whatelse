import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * @description Supprime un projet par son ID
 * @param projectId - ID du projet à supprimer
 * @returns boolean - true si supprimé, false sinon
 */
async function deleteProjectById(projectId: string): Promise<boolean> {
  try {
    const project = await prisma.project.findUnique({ where: { id: projectId } });

    if (!project) {
      console.log(`deleteProjectById ~> Projet introuvable : ${projectId}`);
      return false;
    }

    await prisma.project.delete({
      where: { id: projectId },
    });

    console.log(`deleteProjectById ~> Projet supprimé : ${projectId}`);
    return true;
  } catch (error) {
    console.log(`deleteProjectById ~> Erreur : ${projectId}`, error);
    return false;
  }
}

export default deleteProjectById;
