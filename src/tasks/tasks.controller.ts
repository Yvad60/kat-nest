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
import { UpdateTaskStatusDto } from './dtos/update-task-status.dto';
import { TasksService } from './tasks.service';

@Controller('tasks')
class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  getAllTasks(@Query() taskFilter: TaskFilterDto) {
    const { search, status } = taskFilter;
    if (search && status)
      return this.taskService.getTasksWithFilters(taskFilter);
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
  updateTaskStatus(
    @Param('id') id: string,
    @Body() updateTaskStatusDto: UpdateTaskStatusDto,
  ) {
    const newStatus = updateTaskStatusDto.status;
    return this.taskService.updateTaskStatus(id, newStatus);
  }
}

export default TasksController;
