import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreatePlanDto {
  @IsNotEmpty()
  name: string;

  @IsNumber()
  price: number;
}
