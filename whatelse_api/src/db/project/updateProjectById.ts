import { PrismaClient } from '@prisma/client';
import { Project } from './project.types';

const prisma = new PrismaClient();

/**
 * @description modifie un projet par son ID
 * @param id - ID du projet
 * @returns Projet modifié
 */
async function updateProjectById(id: string, data: Partial<Project>): Promise<Project | null> {
    const project = await prisma.project.update({
        where: { id },
        data,
    });
    if (!project) {
        console.log(`updateProjectById ~> Aucun projet trouvé pour l'ID : ${id}`);
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

export default updateProjectById;