import { IsIn, IsInt, IsString } from 'class-validator';

export class CurrentUserDto {
  @IsString()
  id: string;

  @IsString()
  role: string;
}
