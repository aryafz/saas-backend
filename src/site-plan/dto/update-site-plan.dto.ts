import { PartialType } from '@nestjs/mapped-types';
import { CreateSitePlanDto } from './create-site-plan.dto';

export class UpdateSitePlanDto extends PartialType(CreateSitePlanDto) {}
