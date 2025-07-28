import { IsString, IsBoolean, IsOptional } from 'class-validator';

export class CreateSiteFeatureDto {
  // siteId comes from tenant
  @IsString()
  featureId!: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
