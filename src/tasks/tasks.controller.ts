import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateTaskDto } from './dtos/create-task.dto';
import { TaskFilterDto } from './dtos/get-tasks-filter.dto';
import { TaskStatus } from './tasks.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  getAllTasks(@Query() taskFilter: TaskFilterDto) {
    console.log(taskFilter)
    const { search, status } = taskFilter;
    if (search && status)
      return this.taskService.getTasksWithFilters(search, status);
    return this.taskService.getTasks();
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string) {
    return this.taskService.getTaskById(id);
  }

  @Post()
  addTask(@Body() createTaskDto: CreateTaskDto) {
    return this.taskService.createTask(createTaskDto);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string) {
    return this.taskService.deleteTaskById(id);
  }

  @Patch('/:id/status')
  updateTaskStatus(@Param('id') id: string, @Body('status') status: string) {
    const newStatus = TaskStatus[status.toUpperCase()];
    return this.taskService.updateTaskStatus(id, newStatus);
  }
}
