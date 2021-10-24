import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entitiy';

export interface SubjectState {
  id: number;
  user: User;
  title: string;
  createdDate: Date;
  updatedDate: Date;
}

@Entity()
export class Subject {
  constructor(subject?: Omit<SubjectState, 'id'>) {
    if (subject) {
      this.user = subject.user;
      this.title = subject.title;
      this.createdDate = subject.createdDate;
      this.updatedDate = subject.updatedDate;
    }
  }

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type) => User, (user) => user.id)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false })
  createdDate: Date;

  @Column({ nullable: false })
  updatedDate: Date;
}
