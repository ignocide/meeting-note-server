import { IsNotEmpty } from 'class-validator';

export class UpdateSubjectDto {
  @IsNotEmpty()
  title: string;
}
