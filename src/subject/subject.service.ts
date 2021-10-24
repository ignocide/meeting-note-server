import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Subject } from '../entity/subject.entitiy';
import { User } from '../entity/user.entitiy';
import { SubjectRepository } from '../repository/subject.repository';
import { CreateSubjectDto } from './dto/CreateSubjectDto';

@Injectable()
export class SubjectService {
  constructor(
    @InjectRepository(Subject)
    private subjectRepository: SubjectRepository,
  ) {}

  async create(userId, { title }: CreateSubjectDto) {
    const newSubject = new Subject({
      title: title,
      user: User.fromUserId(userId),
      createdDate: new Date(),
      updatedDate: new Date(),
    });

    await this.subjectRepository.save(newSubject);

    return newSubject;
  }

  async update(
    userId,
    { subjectId, title }: { subjectId: number; title: string },
  ) {
    const subject = await this.subjectRepository.findOne({
      id: subjectId,
      user: User.fromUserId(userId),
    });

    if (!subject) {
      throw new NotFoundException();
    }

    subject.title = title;

    await this.subjectRepository.save(subject);

    return subject;
  }

  async delete(userId, { subjectId }: { subjectId: number }) {
    const subject = await this.subjectRepository.findOne({
      id: subjectId,
      user: User.fromUserId(userId),
    });

    if (!subject) {
      throw new NotFoundException();
    }

    await this.subjectRepository.delete(subjectId);
  }
}
