import { IsNotEmpty } from 'class-validator';

export class CreateFeatureDto {
  @IsNotEmpty()
  code!: string;
  @IsNotEmpty()
  name!: string;

  description?: string;
}
