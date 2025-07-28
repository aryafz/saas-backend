import { IsString, IsBoolean, IsOptional, IsDateString } from 'class-validator';

export class CreateSitePlanDto {
  // siteId comes from tenant
  @IsString()
  planId!: string;

  @IsBoolean()
  isActive!: boolean;

  @IsOptional()
  @IsDateString()
  startsAt?: string;

  @IsOptional()
  @IsDateString()
  endsAt?: string;

  @IsOptional()
  @IsString()
  status?: string;
}
