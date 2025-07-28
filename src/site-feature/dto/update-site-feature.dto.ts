import { PartialType } from '@nestjs/mapped-types';
import { CreateSiteFeatureDto } from './create-site-feature.dto';

export class UpdateSiteFeatureDto extends PartialType(CreateSiteFeatureDto) {}
