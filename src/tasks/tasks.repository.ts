import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import Task from './task.entity';

@Injectable()
class TaskRepository extends Repository<Task> {
  constructor(private readonly dataSource: DataSource) {
    super(Task, dataSource.manager);
  }
}

export default TaskRepository;
