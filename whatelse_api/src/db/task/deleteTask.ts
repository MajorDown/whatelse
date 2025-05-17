import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * @description Supprime une tâche par son ID
 * @param taskId - ID de la tâche
 * @returns boolean - true si supprimée, false si non trouvée ou erreur
 */
async function deleteTask(taskId: string): Promise<boolean> {
  try {
    const task = await prisma.task.findUnique({
      where: { id: taskId },
    });

    if (!task) {
      console.log(`deleteTask ~> Tâche introuvable : ${taskId}`);
      return false;
    }

    await prisma.task.delete({
      where: { id: taskId },
    });

    console.log(`deleteTask ~> Tâche supprimée : ${taskId}`);
    return true;
  } catch (error) {
    console.log(`deleteTask ~> Erreur pour ${taskId}`, error);
    return false;
  }
}

export default deleteTask;
