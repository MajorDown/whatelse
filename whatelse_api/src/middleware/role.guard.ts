import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
  mixin,
  Type,
} from '@nestjs/common';
import { Request } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Factory de guard personnalisable selon les rôles requis : creator, contributor ou les deux
 */
export function RoleGuard(allowedRoles: ('creator' | 'contributor')[]): Type<CanActivate> {
  @Injectable()
  class RoleGuardMixin implements CanActivate {
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest<Request>();
      const user = request.user;
      if (!user || !user.id) throw new UnauthorizedException('Utilisateur non authentifié');

      const userId = user.id;

      // 🔍 Récupération du projectId direct ou via la task
      let projectId = request.body.projectId || request.params.projectId;
      if (!projectId && request.params.id) {
        const task = await prisma.task.findUnique({
          where: { id: request.params.id },
          select: { projectId: true },
        });
        if (!task) throw new ForbiddenException('Tâche introuvable');
        projectId = task.projectId;
      }

      if (!projectId) throw new ForbiddenException('ID de projet introuvable');

      // Vérifie les rôles demandés
      const checks: boolean[] = [];

      if (allowedRoles.includes('creator')) {
        const project = await prisma.project.findUnique({
          where: { id: projectId },
          select: { creatorId: true },
        });
        if (!project) throw new ForbiddenException('Projet introuvable');
        if (project.creatorId === userId) checks.push(true);
      }

      if (allowedRoles.includes('contributor')) {
        const contribution = await prisma.contribution.findUnique({
          where: {
            userId_projectId: {
              userId,
              projectId,
            },
          },
        });
        if (contribution) checks.push(true);
      }

      if (checks.includes(true)) return true;

      throw new ForbiddenException('Accès refusé : droits insuffisants');
    }
  }

  return mixin(RoleGuardMixin);
}
