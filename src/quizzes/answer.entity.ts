import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Question } from './question.entity';

@Entity()
export class Answer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne('Question', 'answers')
  @JoinColumn({ name: 'questionId' })
  question: Question;

  @Column()
  questionId: number;

  @ManyToOne('Question', { nullable: true })
  @JoinColumn({ name: 'nextQuestionId' })
  nextQuestion: Question;

  @Column({ nullable: true })
  nextQuestionId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
