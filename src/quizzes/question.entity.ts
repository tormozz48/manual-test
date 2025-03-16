import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Quiz } from './quiz.entity';
import { Answer } from './answer.entity';

@Entity()
export class Question {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: string;

  @Column()
  name: string;

  @ManyToOne('Quiz', 'questions')
  @JoinColumn({ name: 'quizId' })
  quiz: Quiz;

  @Column()
  quizId: number;

  @OneToMany(() => Answer, (answer) => answer.question)
  answers: Answer[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
