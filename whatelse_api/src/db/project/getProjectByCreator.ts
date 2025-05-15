import { PrismaClient } from '@prisma/client';
import { Project } from './project.types';

const prisma = new PrismaClient();

/**
 * @description Récupère tous les projets créés par un utilisateur
 * @param creatorId - ID de l'utilisateur créateur
 * @returns Liste des projets créés par ce user
 */
async function getProjectsByCreator(creatorId: string): Promise<Project[]> {
    const projects = await prisma.project.findMany({
        where: { creatorId },
    });

    return projects.map(p => ({
        id: p.id,
        title: p.title,
        description: p.description ?? undefined,
        status: p.status as 'pending' | 'completed',
        creatorId: p.creatorId,
        statusList: p.statusList as string[],
    }));
}

export default getProjectsByCreator;
