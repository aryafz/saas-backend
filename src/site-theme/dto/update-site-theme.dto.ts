import { PartialType } from '@nestjs/mapped-types';
import { CreateSiteThemeDto } from './create-site-theme.dto';

export class UpdateSiteThemeDto extends PartialType(CreateSiteThemeDto) {}
