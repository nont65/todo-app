import { IsNotEmpty, IsString } from 'class-validator';

export class AddDto {
  @IsNotEmpty()
  @IsString()
  text: string;
}
