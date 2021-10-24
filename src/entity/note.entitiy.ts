import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entitiy';

export interface NoteState {
  id: number;
  user: User;
  title: string;
  createdDate: Date;
  updatedDate: Date;
}

@Entity()
export class Note {
  constructor(note?: Omit<NoteState, 'id'>) {
    if (note) {
      this.user = note.user;
      this.title = note.title;
      this.createdDate = note.createdDate;
      this.updatedDate = note.updatedDate;
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
