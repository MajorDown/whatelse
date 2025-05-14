import { PrismaClient } from '@prisma/client';
import generateId from 'utils/generateId';
import { PasswordManager } from 'utils/PasswordManager';

const prisma = new PrismaClient();

type CreateUserInput = {
  name: string;
  email: string;
  password: string;
};

/**
 * @description Crée un nouvel utilisateur dans la base de données
 * @param data - Données de l'utilisateur à créer
 * @returns Promise<string> - l'id de l'utilisateur créé
 */
async function createUser(data: CreateUserInput): Promise<string> {
    const userId = generateId('user');
    const created = await prisma.user.create({
        data: {
            id: userId,
            name: data.name,
            email: data.email,
            password: await PasswordManager.encrypt(data.password),
        },
    });
    if (!created) {
        console.log('createUser ~> Erreur lors de la création du user via prisma.');
        throw new Error('Erreur lors de la création du user via prisma.');
    }
    console.log('createUser ~> User créé avec succès via prisma.');
    return created.id;
}

export default createUser;