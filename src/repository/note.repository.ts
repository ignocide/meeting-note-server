import { Repository, EntityRepository } from 'typeorm';
import { Note } from '../entity/note.entitiy';

@EntityRepository(Note)
export class NoteRepository extends Repository<Note> {}
