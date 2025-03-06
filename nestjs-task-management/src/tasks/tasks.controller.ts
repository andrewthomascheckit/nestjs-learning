import {
  Body,
  Delete,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { TaskStatus } from './task-status';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskFilterDto } from './dto/task-filter.dto';
import { Task } from './task.entity';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getTasks(@Query() filter: TaskFilterDto): Promise<Task[]> {
    return this.tasksService.findTasks(filter);
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Promise<string> {
    return this.tasksService.createTask(createTaskDto);
  }

  @Get('/:id')
  async getTaskById(@Param('id') id: string) {
    return this.tasksService.getTaskById(id);
  }

  @Delete('/:id')
  async deleteTaskById(@Param('id') id: string) {
    return this.tasksService.deleteTaskById(id);
  }

  @Patch('/:id/status')
  public async updateStatusById(
    @Param('id') id: string,
    @Body('status') status: TaskStatus,
  ) {
    await this.tasksService.updateStatusById(id, status);
  }
}
