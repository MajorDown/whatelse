import { PrismaClient } from '@prisma/client';
import { Project } from '../project/project.types';

const prisma = new PrismaClient();

/**
 * @description Récupère tous les projets auxquels un utilisateur contribue via Contribution
 * @param userId - ID de l'utilisateur
 * @returns Liste des projets (PublicProject[])
 */
async function getContributionsByUser(userId: string): Promise<Project[]> {
  const contributions = await prisma.contribution.findMany({
    where: { userId },
    include: { project: true },
  });

  if (!contributions.length) {
    console.log(`getContributionsByUser ~> Aucun projet trouvé pour le user : ${userId}`);
    return [];
  }

  return contributions.map(c => ({
    id: c.project.id,
    title: c.project.title,
    description: c.project.description ?? undefined,
    status: c.project.status as 'pending' | 'completed',
    creatorId: c.project.creatorId,
    statusList: c.project.statusList as string[],
  }));
}

export default getContributionsByUser;
