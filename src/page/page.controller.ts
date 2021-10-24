import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserId } from '../decorator/userId.decorator';
import { CreatePageDto } from './dto/CreatePageDto';
import { UpdatePageDto } from './dto/UpdatePageDto';
import { PageService } from './page.service';

@Controller('/notes/:noteId/pages')
export class PageController {
  constructor(private readonly pageService: PageService) {}

  @Get('/')
  async getList(@Param('noteId') noteId: number, @UserId() userId: number) {
    const list = this.pageService.getList(userId, {
      noteId,
    });
    return list;
  }

  @Post('/')
  async create(
    @Param('noteId') noteId: number,
    @UserId() userId: number,
    @Body() createPageDto: CreatePageDto,
  ) {
    const createdPage = this.pageService.create(userId, {
      noteId,
      ...createPageDto,
    });
    return createdPage;
  }

  @Put('/:pageId')
  async update(
    @UserId() userId: number,
    @Param('noteId') noteId: number,
    @Param('pageId') pageId: number,
    @Body() updateNoteDto: UpdatePageDto,
  ) {
    const updatedNote = await this.pageService.update(userId, {
      noteId,
      pageId,
      ...updateNoteDto,
    });

    return updatedNote;
  }

  @Delete('/:pageId')
  async delete(
    @UserId() userId: number,
    @Param('noteId') noteId: number,
    @Param('pageId') pageId: number,
  ) {
    await this.pageService.delete(userId, {
      noteId,
      pageId,
    });
  }
}
