import { IsOptional, IsString } from 'class-validator';

export class TaskFilterDto {
  @IsOptional()
  @IsString()
  status?: string;
  @IsOptional()
  @IsString()
  search?: string;
}
