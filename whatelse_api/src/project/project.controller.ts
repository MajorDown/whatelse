import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import {AuthGuard} from '@/src/middleware/auth.guard';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { Request } from 'express';
import TokenManager from '@/utils/TokenManager';

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
}
