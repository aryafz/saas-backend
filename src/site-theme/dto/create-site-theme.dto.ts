import { IsNotEmpty, IsOptional, IsDateString } from 'class-validator';

export class CreateSiteThemeDto {
  @IsNotEmpty()
  siteId: string;

  @IsNotEmpty()
  themeId: string;

  @IsOptional()
  @IsDateString()
  activatedAt?: string;
}
