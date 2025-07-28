import { IsNotEmpty, IsOptional, IsDateString } from 'class-validator';

export class CreateSiteFeatureDto {
  @IsNotEmpty()
  siteId: string;

  @IsNotEmpty()
  featureId: string;

  @IsOptional()
  @IsDateString()
  activatedAt?: string;

  @IsOptional()
  @IsDateString()
  expiresAt?: string;
}
