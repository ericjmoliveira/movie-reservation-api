import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { hash, compare } from 'bcrypt';

import { SignInDto } from './dtos/sign-in.dto';
import { SignUpDto } from './dtos/sign-up.dto';
import { PrismaService } from '@/modules/prisma/prisma.service';
import { InvalidCredentialsException } from '@/common/http/exceptions/invalid-credentials.exception';
import { EmailAlreadyInUseException } from '@/common/http/exceptions/email-already-in-use.exception';
import { PasswordsDoNotMatchException } from '@/common/http/exceptions/passwords-do-not-match.exception';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService
  ) {}

  async signIn(signInDto: SignInDto) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email: signInDto.email
      }
    });

    if (!user) {
      throw new InvalidCredentialsException();
    }

    const isPasswordCorrect = await compare(signInDto.password, user.password);

    if (!isPasswordCorrect) {
      throw new InvalidCredentialsException();
    }

    delete user.password;

    const accessToken = await this.jwtService.signAsync({ sub: user.id });

    return {
      user,
      accessToken
    };
  }

  async signUp(signUpDto: SignUpDto) {
    if (signUpDto.password !== signUpDto.confirmationPassword) {
      throw new PasswordsDoNotMatchException();
    }

    const isEmailAlreadyInUse = await this.prismaService.user.findUnique({
      where: {
        email: signUpDto.email
      }
    });

    if (isEmailAlreadyInUse) {
      throw new EmailAlreadyInUseException();
    }

    const hashPassword = await hash(signUpDto.password, 10);

    signUpDto.password = hashPassword;

    delete signUpDto.confirmationPassword;

    const user = await this.prismaService.user.create({
      data: signUpDto,
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        password: false,
        role: true,
        createdAt: true,
        updatedAt: true
      }
    });
    const accessToken = await this.jwtService.signAsync({
      sub: user.id
    });

    return {
      user,
      accessToken
    };
  }
}
