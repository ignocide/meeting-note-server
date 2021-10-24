import { Body, Controller, Delete, Param, Post, Put } from '@nestjs/common';
import { UserId } from '../decorator/userId.decorator';
import { CreateSubjectDto } from './dto/CreateSubjectDto';
import { UpdateSubjectDto } from './dto/UpdateSubjectDto';
import { SubjectService } from './subject.service';

@Controller('subject')
export class SubjectController {
  constructor(private readonly subjectService: SubjectService) {}

  @Post('/')
  async createSubject(
    @UserId() userId: number,
    @Body() createSubjectDto: CreateSubjectDto,
  ) {
    const createdSubject = await this.subjectService.create(
      userId,
      createSubjectDto,
    );

    return createdSubject;
  }

  @Put('/:subjectId')
  async updateSubject(
    @UserId() userId: number,
    @Param('subjectId') subjectId: number,
    @Body() updateSubjectDto: UpdateSubjectDto,
  ) {
    const updatedSubject = await this.subjectService.update(userId, {
      subjectId,
      title: updateSubjectDto.title,
    });

    return updatedSubject;
  }

  @Delete('/:subjectId')
  async deleteSubject(
    @UserId() userId: number,
    @Param('subjectId') subjectId: number,
  ) {
    await this.subjectService.delete(userId, {
      subjectId,
    });
  }
}
