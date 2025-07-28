import { IsNotEmpty, IsNumber, IsOptional, IsISO8601 } from 'class-validator';

export class CreatePaymentDto {
  @IsNotEmpty()
  sitePlanId!: string;

  @IsNumber()
  amount!: number;

  @IsNotEmpty()
  currency!: string;

  @IsOptional()
  status?: string;

  @IsOptional()
  @IsISO8601()
  transactionDate?: string;

  metadata?: any;
}
