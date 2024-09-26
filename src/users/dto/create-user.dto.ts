import { IsEmail, IsNotEmpty, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {
  @MinLength(5)
  @MaxLength(20)
  name: string;

  @IsEmail()
  email: string;

  @MinLength(8)
  password: string;

  @MinLength(8)
  passwordConfirm: string;
}
