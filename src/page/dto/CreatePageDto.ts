import { IsNotEmpty } from 'class-validator';

export class CreatePageDto {
  @IsNotEmpty()
  creator: string;

  @IsNotEmpty()
  attendees: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  location: string;

  title?: string;

  result?: string;
}
