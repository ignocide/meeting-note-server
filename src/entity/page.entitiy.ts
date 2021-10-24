import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Note } from './note.entitiy';

export interface PageState {
  id: number;
  note: Note;
  title?: string;
  creator: string;
  attendees: string;
  description: string;
  result?: string;
  location: string;
  createdDate: Date;
  updatedDate: Date;
}

@Entity()
export class Page {
  constructor(note?: Omit<PageState, 'id'>) {
    if (note) {
      this.note = note.note;
      this.title = note.title;
      this.creator = note.creator;
      this.attendees = note.attendees;
      this.description = note.description;
      this.result = note.result;
      this.location = note.location;
      this.createdDate = note.createdDate;
      this.updatedDate = note.updatedDate;
    }
  }

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type) => Note, (note) => note.id)
  @JoinColumn({ name: 'noteId' })
  note: Note;

  @Column({ nullable: true })
  title: string;

  @Column({ nullable: false })
  creator: string;

  @Column({ nullable: false })
  attendees: string;

  @Column({ nullable: false })
  description: string;

  @Column({ nullable: true })
  result: string;

  @Column({ nullable: false })
  location: string;

  @Column({ nullable: false })
  createdDate: Date;

  @Column({ nullable: false })
  updatedDate: Date;
}
