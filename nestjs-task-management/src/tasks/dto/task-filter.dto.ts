import { TaskStatus } from '../task-status';
import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';

export class TaskFilterDto {
  @IsOptional()
  @IsNotEmpty()
  filterText: string | null;
  @IsEnum(TaskStatus)
  @IsOptional()
  filterStatus: TaskStatus | null;
}
