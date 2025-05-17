import { PrismaClient } from '@prisma/client';
import { PublicUser } from '../user/user.types';

const prisma = new PrismaClient();

/**
 * @description Récupère tous les contributeurs d’un projet via la table Contribution
 * @param projectId - ID du projet
 * @returns Liste des contributeurs (PublicUser[])
 */
async function getContributionsByProject(projectId: string): Promise<PublicUser[]> {
  const contributions = await prisma.contribution.findMany({
    where: { projectId },
    include: { user: true },
  });

  if (!contributions.length) {
    console.log(`getContributionsByProject ~> Aucun contributeur pour le projet : ${projectId}`);
    return [];
  }

  return contributions.map(c => ({
    id: c.user.id,
    name: c.user.name,
    email: c.user.email,
  }));
}

export default getContributionsByProject;
