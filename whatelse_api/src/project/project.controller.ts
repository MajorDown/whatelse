import { Body, Controller, Param, Get, Post, Delete, Patch, Req, UseGuards, NotFoundException, ForbiddenException } from '@nestjs/common';
import {AuthGuard} from '@/src/middleware/auth.guard';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { Request } from 'express';
import TokenManager from '@/utils/TokenManager';
import getProjectById from '@/src/db/project/getProjectById';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  @UseGuards(AuthGuard)
  async create(@Body() dto: CreateProjectDto, @Req() req: Request) {
    const authHeader = req.headers['authorization'];
    const token = authHeader?.split(' ')[1];
    const payload = TokenManager.check(token!);
    const creatorId = payload!.id;

    return this.projectService.create(dto, creatorId);
  }

  @Get('byCreator')
  @UseGuards(AuthGuard)
  async getByCreator(@Req() req: Request) {
    const authHeader = req.headers['authorization'];
    const token = authHeader?.split(' ')[1];
    const payload = TokenManager.check(token!);
    const creatorId = payload!.id;
    return this.projectService.getByCreator(creatorId);
  }

  @Get('byContributions')
  @UseGuards(AuthGuard)
  async getByContribution(@Req() req: Request) {
    const token = req.headers['authorization']?.split(' ')[1];
    const payload = TokenManager.check(token!);
    const userId = payload!.id;
    return this.projectService.getByContribution(userId);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async delete(@Param('id') projectId: string, @Req() req: Request) {
    const token = req.headers['authorization']?.split(' ')[1];
    const payload = TokenManager.check(token!);
    const userId = payload!.id;
    const project = await getProjectById(projectId);
    if (!project) {
      throw new NotFoundException('Projet non trouvé');
    }
    if (project.creatorId !== userId) {
      throw new ForbiddenException('Vous ne pouvez supprimer que vos propres projets');
    }
    await this.projectService.deleteById(projectId);
    return { message: 'Projet supprimé avec succès' };
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  async update(
    @Param('id') projectId: string,
    @Body() updateDto: Partial<CreateProjectDto>,
    @Req() req: Request
  ) {
    const token = req.headers['authorization']?.split(' ')[1];
    const payload = TokenManager.check(token!);
    const userId = payload!.id;
    const project = await getProjectById(projectId);
    if (!project) {
      throw new NotFoundException('Projet introuvable');
    }
    if (project.creatorId !== userId) {
      throw new ForbiddenException('Vous ne pouvez modifier que vos propres projets');
    }
    return this.projectService.updateById(projectId, updateDto);
  }
}
