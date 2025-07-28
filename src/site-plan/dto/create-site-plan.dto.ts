import { IsNotEmpty, IsEnum, IsOptional, IsDateString } from 'class-validator';
import { SitePlanStatus } from '@prisma/client';

export class CreateSitePlanDto {
  @IsNotEmpty()
  siteId: string;

  @IsNotEmpty()
  planId: string;

  @IsOptional()
  @IsDateString()
  startedAt?: string;

  @IsOptional()
  @IsDateString()
  expiresAt?: string;

  @IsOptional()
  @IsEnum(SitePlanStatus)
  status?: SitePlanStatus;
}
