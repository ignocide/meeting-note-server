import { Repository, EntityRepository } from 'typeorm';
import { Subject } from '../entity/subject.entitiy';

@EntityRepository(Subject)
export class SubjectRepository extends Repository<Subject> {}
