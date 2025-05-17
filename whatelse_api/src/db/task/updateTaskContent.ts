import { PrismaClient } from '@prisma/client';
import { Task } from './task.types';

const prisma = new PrismaClient();

type UpdateTaskContentInput = {
  title?: string;
  description?: string;
};

/**
 * @description Met à jour le contenu d'une tâche (titre, description)
 * @param taskId - ID de la tâche
 * @param data - Nouvelles valeurs
 * @returns Task mise à jour, ou null si tâche introuvable
 */
async function updateTaskContent(taskId: string, data: UpdateTaskContentInput): Promise<Task | null> {
  try {
    const task = await prisma.task.findUnique({
      where: { id: taskId },
    });

    if (!task) {
      console.log(`updateTaskContent ~> Tâche introuvable : ${taskId}`);
      return null;
    }

    const updated = await prisma.task.update({
      where: { id: taskId },
      data,
    });

    return {
      id: updated.id,
      title: updated.title,
      description: updated.description ?? undefined,
      status: updated.status,
      projectId: updated.projectId,
    };
  } catch (error) {
    console.log(`updateTaskContent ~> Erreur pour ${taskId}`, error);
    return null;
  }
}

export default updateTaskContent;
