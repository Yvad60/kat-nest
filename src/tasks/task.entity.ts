import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: string;
}

export default Task;
