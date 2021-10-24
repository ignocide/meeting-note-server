import { Body, Controller, Delete, Param, Post, Put } from '@nestjs/common';
import { UserId } from '../decorator/userId.decorator';
import { CreateNoteDto } from './dto/CreateNoteDto';
import { UpdateNoteDto } from './dto/UpdateNoteDto';
import { NoteService } from './note.service';

@Controller('note')
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @Post('/')
  async create(@UserId() userId: number, @Body() createNoteDto: CreateNoteDto) {
    const createdNote = await this.noteService.create(userId, createNoteDto);

    return createdNote;
  }

  @Put('/:noteId')
  async update(
    @UserId() userId: number,
    @Param('noteId') noteId: number,
    @Body() updateNoteDto: UpdateNoteDto,
  ) {
    const updatedNote = await this.noteService.update(userId, {
      noteId,
      title: updateNoteDto.title,
    });

    return updatedNote;
  }

  @Delete('/:noteId')
  async delete(@UserId() userId: number, @Param('noteId') noteId: number) {
    await this.noteService.delete(userId, {
      noteId,
    });
  }
}
