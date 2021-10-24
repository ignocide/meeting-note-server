import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PageRepository } from '../repository/page.repository';
import { PageController } from './page.controller';
import { PageService } from './page.service';

@Module({
  imports: [TypeOrmModule.forFeature([PageRepository])],
  controllers: [PageController],
  providers: [PageService],
  //   exports: [SubjectService],
})
export class PageModule {}
