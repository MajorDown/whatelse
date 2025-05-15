import { PrismaClient } from '@prisma/client';
import generateId from 'utils/generateId';
import { CreateProjectInput, Project } from './project.types';

const prisma = new PrismaClient();

/**
 * @description Crée un projet lié à un utilisateur (creator)
 * @param data - Informations du projet
 * @returns string - ID du projet créé
 */
async function createProject(data: CreateProjectInput): Promise<Project> {

  const newProject: Project = {
      id: generateId('project'),
      title: data.title,
      description: data.description,
      status: 'pending',
      creatorId: data.creatorId,
      statusList: data.statusList || ['en attente', 'en cours', 'terminé'],
  }

  await prisma.project.create({
    data: newProject,
  });

  return newProject;
}

export default createProject;
