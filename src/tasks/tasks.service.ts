import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTaskDto } from './dtos/create-task.dto';
import { TaskFilterDto } from './dtos/get-tasks-filter.dto';
import Task from './task.entity';
import TaskRepository from './tasks.repository';
import { TaskStatus } from './tasks.model';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: TaskRepository,
  ) {}

  async getTaskById(id: string): Promise<Task> {
    const found = await this.taskRepository.findOne({ where: { id } });
    if (!found) throw new NotFoundException('Task with provided id not found');
    return found;
  }

  async getTasks() {
    return await this.taskRepository.find({});
  }

  async getTasksWithFilters(taskFilter: TaskFilterDto) {
    const { search, status } = taskFilter;
    const query = this.taskRepository.createQueryBuilder();
    if (status) {
      query.andWhere('task.status = :status', { status });
    }
    if (search) {
      query.andWhere(
        'task.title LIKE LOWER(:search) OR task.description LIKE LOWER(:search)',
        { search },
      );
    }
    return query.getMany();
  }

  async createTask(createTaskDto: CreateTaskDto) {
    const { description, title } = createTaskDto;
    const newTask = this.taskRepository.create({
      description,
      title,
      status: TaskStatus.OPEN,
    });

    return await this.taskRepository.save(newTask);
  }

  async deleteTaskById(id: string) {
    const result = await this.taskRepository.delete({ id });
    if (result.affected === 0)
      throw new NotFoundException('Task with provided id not found');
    return result;
  }
  async updateTaskStatus(taskId: string, newStatus: TaskStatus) {
    const foundTask = await this.getTaskById(taskId);
    foundTask.status = newStatus;
    return await this.taskRepository.save(foundTask);
  }
}
