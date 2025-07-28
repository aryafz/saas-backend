import {
  IsNotEmpty,
  IsNumber,
  IsEnum,
  IsOptional,
  IsISO8601,
} from 'class-validator';
import { PaymentStatus } from '@prisma/client';

export class CreatePaymentDto {
  @IsNotEmpty()
  sitePlanId: string;

  @IsNumber()
  amount: number;

  @IsNotEmpty()
  currency: string;

  @IsOptional()
  @IsEnum(PaymentStatus)
  status?: PaymentStatus;

  @IsOptional()
  @IsISO8601()
  transactionDate?: string;

  metadata?: any;
}
