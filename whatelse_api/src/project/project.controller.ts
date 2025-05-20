import { Body, Controller, Param, Get, Post, Delete, Patch, Req, UseGuards, NotFoundException } from '@nestjs/common';
import {AuthGuard} from '@/src/middleware/auth.guard';
import { RoleGuard } from '@/src/middleware/role.guard';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { Request } from 'express';
import getProjectById from '@/src/db/project/getProjectById';

@Controller('project')
@UseGuards(AuthGuard, RoleGuard(['creator']))
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  async create(@Body() dto: CreateProjectDto, @Req() req: Request) {
    const userId = req.user!.id;
    return this.projectService.create(dto, userId);
  }

  @Get('byCreator')
  async getByCreator(@Req() req: Request) {
    const userId = req.user!.id;
    return this.projectService.getByCreator(userId);
  }

  @Get('byContributions')
  async getByContribution(@Req() req: Request) {
    const userId = req.user!.id;
    return this.projectService.getByContribution(userId);
  }

  @Delete(':id')
  async delete(@Param('id') projectId: string, @Req() req: Request) {
    const project = await getProjectById(projectId);
    if (!project) {
      throw new NotFoundException('Projet non trouvé');
    }
    await this.projectService.deleteById(projectId);
    return { message: 'Projet supprimé avec succès' };
  }

  @Patch(':id')
  async update(
    @Param('id') projectId: string,
    @Body() updateDto: Partial<CreateProjectDto>,
    @Req() req: Request
  ) {
    const project = await getProjectById(projectId);
    if (!project) {
      throw new NotFoundException('Projet introuvable');
    }
    return this.projectService.updateById(projectId, updateDto);
  }
}
