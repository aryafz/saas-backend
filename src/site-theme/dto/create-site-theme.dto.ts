import { IsString, IsOptional, IsBoolean } from 'class-validator';

export class CreateSiteThemeDto {
  // siteId from tenant
  @IsString()
  themeId!: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
