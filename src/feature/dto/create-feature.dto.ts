import { IsNotEmpty } from 'class-validator';

export class CreateFeatureDto {
  @IsNotEmpty()
  name: string;

  description?: string;
}
