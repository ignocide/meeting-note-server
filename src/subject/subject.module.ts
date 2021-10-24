import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubjectRepository } from '../repository/subject.repository';
import { SubjectController } from './subject.controller';
import { SubjectService } from './subject.service';

@Module({
  imports: [TypeOrmModule.forFeature([SubjectRepository])],
  controllers: [SubjectController],
  providers: [SubjectService],
  //   exports: [SubjectService],
})
export class SubjectModule {}
