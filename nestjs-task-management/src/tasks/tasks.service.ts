import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskFilterDto } from './dto/task-filter.dto';
import { TasksRepository } from './tasks.repository';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
  constructor(private tasksRepository: TasksRepository) {}

  public async getTasks(filter: TaskFilterDto): Promise<Task[]> {
    return await this.tasksRepository.findTasks(filter);
  }

  public async createTask(createTaskDto: CreateTaskDto): Promise<string> {
    return this.tasksRepository.createTask(createTaskDto);
  }

  public async getTaskById(id: string): Promise<Task> {
    const found = await this.tasksRepository.getTaskById(id);

    if (!found) {
      throw new NotFoundException(`Task with ID "${id}" not found `);
    }

    return found;
  }

  public async updateStatusById(id: string, status: TaskStatus) {
    const task = await this.tasksRepository.getTaskById(id);

    if (!task) {
      throw new NotFoundException(`Task with ID "${id}" not found `);
    }

    task.status = status;

    return this.tasksRepository.save(task);
  }

  public async deleteTaskById(id: string): Promise<void> {
    const success = await this.tasksRepository.deleteTaskById(id);

    if (!success) {
      throw new NotFoundException(`Couldn't delete task with id "${id}"`);
    }
  }
}
