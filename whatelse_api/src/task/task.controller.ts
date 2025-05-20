import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from '@/src/db/task/task.types';
import { AuthGuard } from '../middleware/auth.guard';
import { RoleGuard } from '../middleware/role.guard';

import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskContentDto } from './dto/update-task-content.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';

@Controller('task')
@UseGuards(AuthGuard, RoleGuard(['creator', 'contributor']))
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  create(@Body() dto: CreateTaskDto): Promise<Task | null> {
    return this.taskService.create(dto);
  }

  @Get('by-project/:projectId')
  getByProject(@Param('projectId') projectId: string): Promise<Task[]> {
    return this.taskService.getByProject(projectId);
  }

  @Patch('update-content/:id')
  updateContent(
    @Param('id') taskId: string,
    @Body() dto: UpdateTaskContentDto
  ): Promise<Task | null> {
    return this.taskService.updateContent(taskId, dto);
  }

  @Patch('update-status/:id')
  updateStatus(
    @Param('id') taskId: string,
    @Body() dto: UpdateTaskStatusDto
  ): Promise<Task | null> {
    return this.taskService.updateStatus(taskId, dto.status);
  }

  @Delete(':id')
  delete(@Param('id') taskId: string): Promise<boolean> {
    return this.taskService.delete(taskId);
  }
}
