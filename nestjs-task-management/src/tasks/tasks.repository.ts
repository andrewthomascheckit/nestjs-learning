import { DataSource, Repository } from 'typeorm';
import { Task } from './task.entity';
import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task-status';

@Injectable()
export class TasksRepository extends Repository<Task> {
  constructor(dataSource: DataSource) {
    super(Task, dataSource.createEntityManager());
  }

  public async createTask(createTaskDto: CreateTaskDto): Promise<string> {
    const { title, description } = createTaskDto;

    const task = this.create({
      title,
      description,
      status: TaskStatus.OPEN,
    });

    await this.save(task);

    return task.id;
  }

  public async getTaskById(id: string): Promise<Task | null> {
    return this.findOneBy({ id: id });
  }

  public async deleteTaskById(id: string): Promise<boolean> {
    const result = await this.delete({ id: id });
    return result.affected === 1;
  }
}
