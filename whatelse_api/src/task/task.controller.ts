import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskInput, Task } from '@/src/db/task/task.types';
import { AuthGuard } from '../middleware/auth.guard';
import { RoleGuard } from '../middleware/role.guard';

@Controller('task')
@UseGuards(AuthGuard, RoleGuard(['creator', 'contributor']))
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  create(@Body() data: CreateTaskInput): Promise<Task | null> {
    return this.taskService.create(data);
  }

  @Get('by-project/:projectId')
  getByProject(@Param('projectId') projectId: string): Promise<Task[]> {
    return this.taskService.getByProject(projectId);
  }

  @Patch('update-content/:id')
  updateContent(
    @Param('id') taskId: string,
    @Body() data: { title: string; description?: string }
  ): Promise<Task | null> {
    return this.taskService.updateContent(taskId, data);
  }

  @Patch('update-status/:id')
  updateStatus(
    @Param('id') taskId: string,
    @Body() data: { status: string }
  ): Promise<Task | null> {
    return this.taskService.updateStatus(taskId, data.status);
  }

  @Delete(':id')
  delete(@Param('id') taskId: string): Promise<boolean> {
    return this.taskService.delete(taskId);
  }
}
