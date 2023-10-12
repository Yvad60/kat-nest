import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dtos/create-task.dto';
import { Task, TaskStatus } from './tasks.model';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getTasks() {
    return this.tasks;
  }

  getTasksWithFilters(search: string, status: string) {
    return this.tasks.filter((task) => {
      return (
        task.status === status &&
        [task.description, task.title].some((field) => field.includes(search))
      );
    });
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
    const taskIndex = this.tasks.findIndex((el) => el.id === taskId);
    if (taskIndex === -1) return null;
    return this.tasks.splice(taskIndex, 1);
  }

  updateTaskStatus(taskId: string, newStatus: TaskStatus) {
    this.tasks = this.tasks.map((task) =>
      task.id === taskId ? { ...task, status: newStatus } : task,
    );
  }
}
