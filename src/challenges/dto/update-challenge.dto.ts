import { IsOptional, IsString } from 'class-validator';

export class UpdateChallengeDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;
}
