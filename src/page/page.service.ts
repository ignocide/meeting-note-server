import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Note } from '../entity/note.entitiy';
import { Page } from '../entity/page.entitiy';
import { PageRepository } from '../repository/page.repository';
import { CreatePageDto } from './dto/CreatePageDto';
import { UpdatePageDto } from './dto/UpdatePageDto';

@Injectable()
export class PageService {
  constructor(
    @InjectRepository(Page)
    private pageRepository: PageRepository,
  ) {}

  async getList(userId: number, { noteId }: { noteId: number }) {
    const list = await this.pageRepository.find({
      where: {
        note: Note.from(noteId, userId),
      },
    });

    return list;
  }

  async create(
    userId: number,
    { noteId, ...createPageDto }: CreatePageDto & { noteId: number },
  ) {
    const createdPage = new Page({
      note: Note.from(noteId, userId),
      createdDate: new Date(),
      updatedDate: new Date(),
      ...createPageDto,
    });

    await this.pageRepository.save(createdPage);

    return createdPage;
  }

  async update(
    userId: number,
    {
      noteId,
      pageId,
      ...updatedPageDto
    }: UpdatePageDto & { noteId: number; pageId: number },
  ) {
    const page = await this.pageRepository.findById({
      userId,
      noteId,
      pageId,
    });

    if (!page) {
      throw new NotFoundException();
    }

    const keys = Object.keys(page);
    for (const key of keys) {
      // @ts-ignore
      if (updatedPageDto[key]) {
        page[key] = updatedPageDto[key];
      }
    }

    page.updatedDate = new Date();

    const updatedPage = await this.pageRepository.save(page);

    return updatedPage;
  }

  async delete(
    userId: number,
    { noteId, pageId }: { noteId: number; pageId: number },
  ) {
    const page = await this.pageRepository.findById({
      userId,
      noteId,
      pageId,
    });

    if (!page) {
      throw new NotFoundException();
    }

    await this.pageRepository.delete(pageId);
  }
}
