import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  username: string;
  @IsNotEmpty()
  email: string;
  @IsNotEmpty()
  password: string;
}
export class ValidateUserDto {
  @IsNotEmpty()
  email: string;
  @IsNotEmpty()
  password: string;
}
