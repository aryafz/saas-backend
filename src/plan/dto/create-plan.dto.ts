import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreatePlanDto {
  @IsNotEmpty()
  code!: string;
  @IsNotEmpty()
  name!: string;
  
  description?: string;

  @IsNumber()
  priceCents!: number;

  currency?: string;
}
