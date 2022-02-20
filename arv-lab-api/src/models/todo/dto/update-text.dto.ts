import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateTextDto {
  @IsNotEmpty()
  @IsString()
  text: string;
}
