import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [
    TasksModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      database: 'task-management',
      username: 'postgres',
      password: 'postgres',
      port: 5432,
      autoLoadEntities: true,
      synchronize: true,
    }),
  ],
})
export class AppModule {}
