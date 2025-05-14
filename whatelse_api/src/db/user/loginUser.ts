import { PrismaClient } from '@prisma/client';
import { PasswordManager } from 'utils/PasswordManager';
import { TokenManager } from 'utils/TokenManager';
import {LoginUserInput, ConnectedUser} from './user.types';

const prisma = new PrismaClient();

/**
 * @description Vérifie un utilisateur et retourne ses infos + token
 * @param data - email + password
 * @returns ConnectedUser - infos + token JWT
 * @throws Erreur si email inconnu ou mot de passe invalide
 */
async function loginUser(data: LoginUserInput): Promise<ConnectedUser> {
  const user = await prisma.user.findUnique({
    where: { email: data.email },
  });
  if (!user) {
    console.log('loginUser ~> Aucun utilisateur ne correspond à cet email.');
    throw new Error('Aucun utilisateur ne correspond à cet email.');
  }
  const passwordValid = await PasswordManager.check(data.password, user.password);
  if (!passwordValid) {
    throw new Error('Mot de passe incorrect.');
  }
  const token = TokenManager.generate({ id: user.id, email: user.email });
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    token,
  };
}

export default loginUser;