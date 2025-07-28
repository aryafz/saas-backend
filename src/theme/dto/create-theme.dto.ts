import { IsNotEmpty } from 'class-validator';

export class CreateThemeDto {
  @IsNotEmpty()
  code!: string;

  @IsNotEmpty()
  name!: string;

  description?: string;

  @IsNotEmpty()
  assetsUrl!: string;
}
