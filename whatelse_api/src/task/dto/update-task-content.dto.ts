import { IsString, IsOptional } from 'class-validator';

export class UpdateTaskContentDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;
}
