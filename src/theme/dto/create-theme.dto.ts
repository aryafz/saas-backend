import { IsNotEmpty } from 'class-validator';

export class CreateThemeDto {
  @IsNotEmpty()
  key: string;

  @IsNotEmpty()
  name: string;

  description?: string;

  @IsNotEmpty()
  assetsUrl: string;
}
