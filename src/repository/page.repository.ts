import { Repository, EntityRepository } from 'typeorm';
import { Note } from '../entity/note.entitiy';
import { Page } from '../entity/page.entitiy';

@EntityRepository(Page)
export class PageRepository extends Repository<Page> {
  findById({
    userId,
    noteId,
    pageId,
  }: {
    userId: number;
    noteId: number;
    pageId: number;
  }) {
    return this.findOne({
      note: Note.from(noteId, userId),
      id: pageId,
    });
  }
}
