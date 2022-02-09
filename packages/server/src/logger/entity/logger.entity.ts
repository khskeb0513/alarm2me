import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('logger')
export class LoggerEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'is_error' })
  isError: boolean;

  @Column({ name: 'job_tag' })
  jobTag: string;

  @Column({ name: 'target_tag', nullable: true })
  targetTag: string;

  @Column()
  context: string;

  @Column()
  message: string;

  @Column({ type: 'text' })
  stack: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
