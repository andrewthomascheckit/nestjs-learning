import { DataSource, MongoRepository } from 'typeorm';
import { Task } from './task.entity';
import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task-status';
import { TaskFilterDto } from './dto/task-filter.dto';

@Injectable()
export class TasksRepository extends MongoRepository<Task> {
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

  public async findTasks(filter: TaskFilterDto): Promise<Task[]> {
    const builder = this.createQueryBuilder('task');

    // if (filter.filterStatus !== null) {
    //   builder.where({ status: filter.filterStatus });
    // }

    // if (filter.filterText != null && filter.filterText.length > 0) {
    //   builder
    //     .where({ title: Like(filter.filterText) })
    //     .orWhere({ description: Like(filter.filterText) });
    // }

    return await builder.getMany();
  }

  public async deleteTaskById(id: string): Promise<boolean> {
    const result = await this.delete({ id: id });
    return result.affected === 1;
  }
}
