import { PrismaClient } from '@prisma/client';
import { Task } from './task.types';

const prisma = new PrismaClient();

/**
 * @description Récupère toutes les tâches associées à un projet
 * @param projectId - ID du projet
 * @returns Liste des tâches du projet
 */
async function getTasksByProject(projectId: string): Promise<Task[]> {
  const tasks = await prisma.task.findMany({
    where: { projectId },
  });

  if (!tasks.length) {
    console.log(`getTasksByProject ~> Aucune tâche pour le projet : ${projectId}`);
    return [];
  }

  return tasks.map(t => ({
    id: t.id,
    title: t.title,
    description: t.description ?? undefined,
    status: t.status as 'pending' | 'completed',
    projectId: t.projectId,
  }));
}

export default getTasksByProject;
