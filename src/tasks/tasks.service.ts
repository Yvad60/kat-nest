import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task, TaskStatus } from './tasks.model';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getTasks() {
    return this.tasks;
  }

  createTask(createTaskDto: CreateTaskDto) {
    const { title, description } = createTaskDto;
    const newTask: Task = {
      id: uuid(),
      description,
      title,
      status: TaskStatus.OPEN,
    };
    this.tasks.push(newTask);
    return newTask;
  }

  getTaskById(taskId: string) {
    const task = this.tasks.find((el) => el.id === taskId);
    if (task == null) return null;
    return task;
  }

  deleteTaskById(taskId: string) {
    this.tasks
  }
}
