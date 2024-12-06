import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class SignUpDto {
  @IsNotEmpty({ message: 'The first name is required.' })
  @IsString({ message: 'The first name must be a string.' })
  @MinLength(2, { message: 'The first name must have at least 2 characters.' })
  firstName: string;

  @IsNotEmpty({ message: 'The last name is required.' })
  @IsString({ message: 'The last name must be a string.' })
  @MinLength(2, { message: 'The last name must have at least 2 characters.' })
  lastName: string;

  @IsNotEmpty({ message: 'The email address is required.' })
  @IsEmail({}, { message: 'The email address format is invalid.' })
  email: string;

  @IsNotEmpty({ message: 'The password is required.' })
  @IsString({ message: 'The password must be a string.' })
  @MinLength(8, { message: 'The password must have at least 8 characters.' })
  password: string;

  @IsNotEmpty({ message: 'The confirmation password is required.' })
  @IsString({ message: 'The confirmation password must be a string.' })
  @MinLength(8, { message: 'The confirmation password must have at least 8 characters.' })
  confirmationPassword: string;
}
