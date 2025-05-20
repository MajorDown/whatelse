import { IsString } from 'class-validator';

export class ContributionDto {
  @IsString()
  userId: string;

  @IsString()
  projectId: string;
}
