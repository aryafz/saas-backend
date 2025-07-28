import { IsNotEmpty } from 'class-validator';

export class CreatePlanFeatureDto {
  @IsNotEmpty()
  planId!: string;

  @IsNotEmpty()
  featureId!: string;
}
