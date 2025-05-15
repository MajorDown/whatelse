import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * @description Récupère tous les IDs utilisateurs existants
 * @returns string[] - Liste des IDs utilisateurs
 */
async function getAllUsersIds(): Promise<string[]> {
  const users = await prisma.user.findMany({
    select: { id: true },
  });

  return users.map((u) => u.id);
}

export default getAllUsersIds;
