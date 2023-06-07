import { IsArray } from 'class-validator';
import {
  HasMimeType,
  IsFile,
  IsFiles,
  MaxFileSize,
  MemoryStoredFile,
} from 'nestjs-form-data';

export class Step5Dto {
  @IsFiles()
  @MaxFileSize(1e6, { each: true })
  @HasMimeType(['image/jpeg', 'image/png'], { each: true })
  images: MemoryStoredFile[];
}
