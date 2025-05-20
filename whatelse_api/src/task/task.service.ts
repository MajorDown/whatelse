import { Injectable } from '@nestjs/common';
import createTask from '@/src/db/task/createTask';
import deleteTask from '@/src/db/task/deleteTask';
import getTasksByProject from '@/src/db/task/getTasksByProject';
import updateTaskContent from '@/src/db/task/updateTaskContent';
import updateTaskStatus from '@/src/db/task/updateTaskStatus';
import { CreateTaskInput, Task } from '@/src/db/task/task.types';

@Injectable()
export class TaskService {
  create(data: CreateTaskInput): Promise<Task | null> {
    return createTask(data);
  }

  getByProject(projectId: string): Promise<Task[]> {
    return getTasksByProject(projectId);
  }

  updateContent(
    taskId: string,
    data: { title: string; description?: string }
  ): Promise<Task | null> {
    return updateTaskContent(taskId, data);
  }

  updateStatus(taskId: string, newStatus: string): Promise<Task | null> {
    return updateTaskStatus(taskId, newStatus);
  }

  delete(taskId: string): Promise<boolean> {
    return deleteTask(taskId);
  }
}
