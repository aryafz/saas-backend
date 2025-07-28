import { IsInt, Min, IsOptional, IsString, Length } from 'class-validator';

export class CreatePaymentDto {
  // siteId comes from tenant
  @IsInt()
  @Min(1)
  amountCents!: number;

  @IsString()
  @Length(3, 10)
  currency!: string;

  @IsString()
  status!: string;

  @IsOptional()
  @IsString()
  externalId?: string;

  @IsOptional()
  @IsString()
  invoiceNo?: string;
}
