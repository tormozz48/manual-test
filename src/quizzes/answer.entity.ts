import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { Question } from './question.entity';
import { AnswerReceipt } from '../receipt/answerReceipt.entity';

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

  @OneToOne('AnswerReceipt', 'answer', { nullable: true })
  receipt: AnswerReceipt;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
