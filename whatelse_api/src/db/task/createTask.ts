import { PrismaClient } from '@prisma/client';
import generateId from 'utils/generateId';
import { Task, CreateTaskInput } from './task.types';

const prisma = new PrismaClient();

/**
 * @description Crée une tâche liée à un projet
 * @param data - Données nécessaires à la création
 * @returns Task créée
 */
async function createTask(data: CreateTaskInput): Promise<Task | null> {
  const project = await prisma.project.findUnique({
    where: { id: data.projectId },
  });

  if (!project) {
    console.log(`createTask ~> Projet introuvable : ${data.projectId}`);
    return null;
  }

  const task: Task = {
    id: generateId('task'),
    title: data.title,
    description: data.description,
    status: 'pending',
    projectId: data.projectId,
  };

  await prisma.task.create({ data: task });

  return task;
}

export default createTask;
