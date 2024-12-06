import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class SignInDto {
  @IsNotEmpty({ message: 'The email address is required.' })
  @IsEmail({}, { message: 'The email address format is invalid.' })
  email: string;

  @IsNotEmpty({ message: 'The password is required.' })
  @IsString({ message: 'The password must be a string.' })
  @MinLength(8, { message: 'The password must have at least 8 characters.' })
  password: string;
}
