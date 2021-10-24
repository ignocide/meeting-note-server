import { IsNotEmpty } from 'class-validator';

export class UpdatePageDto {
  creator?: string;

  attendees?: string;

  description?: string;

  location?: string;

  title?: string;

  result?: string;
}
