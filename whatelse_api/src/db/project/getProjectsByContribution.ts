import { PrismaClient } from '@prisma/client';
import { Project } from './project.types';

const prisma = new PrismaClient();

/**
 * @description Récupère tous les projets auxquels un utilisateur contribue
 * @param userId - ID de l'utilisateur contributeur
 * @returns Liste des projets associés
 */
async function getProjectsByContribution(userId: string): Promise<Project[]> {
    const contributions = await prisma.contribution.findMany({
        where: { userId },
        include: { project: true },
    });
    if (!contributions || contributions.length === 0) {
        console.log(`getProjectsByContributor ~> Aucun projet trouvé pour le contributeur : ${userId}`);
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

export default getProjectsByContribution;
