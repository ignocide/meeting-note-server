import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Note } from '../entity/note.entitiy';
import { User } from '../entity/user.entitiy';
import { NoteRepository } from '../repository/note.repository';
import { CreateNoteDto } from './dto/CreateNoteDto';

@Injectable()
export class NoteService {
  constructor(
    @InjectRepository(Note)
    private noteRepository: NoteRepository,
  ) {}

  async create(userId, { title }: CreateNoteDto) {
    const newNote = new Note({
      title: title,
      user: User.fromUserId(userId),
      createdDate: new Date(),
      updatedDate: new Date(),
    });

    await this.noteRepository.save(newNote);

    return newNote;
  }

  async update(userId, { noteId, title }: { noteId: number; title: string }) {
    const note = await this.noteRepository.findOne({
      id: noteId,
      user: User.fromUserId(userId),
    });

    if (!note) {
      throw new NotFoundException();
    }

    note.title = title;

    await this.noteRepository.save(note);

    return note;
  }

  async delete(userId, { noteId }: { noteId: number }) {
    const note = await this.noteRepository.findOne({
      id: noteId,
      user: User.fromUserId(userId),
    });

    if (!note) {
      throw new NotFoundException();
    }

    await this.noteRepository.delete(noteId);
  }
}
