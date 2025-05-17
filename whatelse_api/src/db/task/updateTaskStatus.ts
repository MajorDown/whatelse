import { PrismaClient } from '@prisma/client';
import { Task } from './task.types';

const prisma = new PrismaClient();

/**
 * @description Met à jour le statut d'une tâche
 * @param taskId - ID de la tâche
 * @param newStatus - Nouveau statut (chaîne libre)
 * @returns La tâche mise à jour, ou null si non trouvée
 */
async function updateTaskStatus(taskId: string, newStatus: string): Promise<Task | null> {
  try {
    const task = await prisma.task.findUnique({
      where: { id: taskId },
    });

    if (!task) {
      console.log(`updateTaskStatus ~> Tâche introuvable : ${taskId}`);
      return null;
    }

    const updated = await prisma.task.update({
      where: { id: taskId },
      data: { status: newStatus },
    });

    return {
      id: updated.id,
      title: updated.title,
      description: updated.description ?? undefined,
      status: updated.status,
      projectId: updated.projectId,
    };
  } catch (error) {
    console.log(`updateTaskStatus ~> Erreur pour ${taskId}`, error);
    return null;
  }
}

export default updateTaskStatus;
