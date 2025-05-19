import { PrismaClient } from '@prisma/client';
import { Project } from './project.types';

const prisma = new PrismaClient();

/**
 * @description Récupère un projet par son ID
 * @param id - ID du projet
 * @returns Projet correspondant à l'ID
 */
async function getProjectById(id: string): Promise<Project | null> {
    const project = await prisma.project.findUnique({
        where: { id },
    });
    if (!project) {
        console.log(`getProjectById ~> Aucun projet trouvé pour l'ID : ${id}`);
        return null;
    }

    return {
        id: project.id,
        title: project.title,
        description: project.description ?? undefined,
        status: project.status as 'pending' | 'completed',
        creatorId: project.creatorId,
        statusList: project.statusList as string[],
    };
}

export default getProjectById;