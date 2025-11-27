import * as bcrypt from 'bcrypt';
import {
  BadRequestException,
  HttpException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { CreateUserDto } from 'src/users/dto/CreateUserDto';
import { UsersRepository } from 'src/users/users.repository';
import { Role } from './roles.enum';
import { Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';
import { JwtPayload } from 'src/interceptors/jwt-payload.interceptor';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(
    email: string,
    password: string,
    res: Response,
  ): Promise<{
    success: boolean;
    accessToken: string;
  }> {
    try {
      const dbUser = await this.usersRepository.findByEmail(email);
      if (!dbUser) {
        throw new NotFoundException('Error en las credenciales');
      }
      const isPasswordValid = await bcrypt.compare(password, dbUser.password);

      if (!isPasswordValid) {
        throw new BadRequestException('Error en las credenciales');
      }

      const userPayload: JwtPayload = {
        sub: dbUser.id,
        id: dbUser.id,
        email: dbUser.email,
        roles: [dbUser.isAdmin ? Role.Admin : Role.User],
      };

      // 🕒 Token de acceso 5 minutos
      const userPayloadRefreshToken = {
        sub: dbUser.id,
        type: 'refresh',
        id: dbUser.id,
        email: dbUser.email,
        roles: [dbUser.isAdmin ? Role.Admin : Role.User],
      };
      const accessToken = this.jwtService.sign(userPayload, {
        expiresIn: '5m',
      });

      // 🕒 Token de refresco 7 días
      const refreshToken = this.jwtService.sign(userPayloadRefreshToken, {
        expiresIn: '7d',
      });

      // guardar cookie segura
      this.setRefreshCookie(res, refreshToken);
      return { success: true, accessToken };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException();
    }
  }

  async signUp(user: CreateUserDto) {
    try {
      const dbUser = await this.usersRepository.findByEmail(user.email);
      if (dbUser) {
        throw new BadRequestException(
          'El correo electrónico ya se encuentra registrado. Inicia sesión.',
        );
      }
      const hashedPassword = await bcrypt.hash(user.password, 10);
      if (!hashedPassword) {
        throw new BadRequestException(
          'No se pudo aplicar hash a la contraseña',
        );
      }
      await this.usersRepository.postUserCreate({
        ...user,
        password: hashedPassword,
      });
      return user;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException();
    }
  }

  private setRefreshCookie(res: Response, refreshToken: string) {
    const isProd = process.env.NODE_ENV === 'production';

    try {
      const cookie = res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: isProd,
        sameSite: isProd ? 'none' : 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000, // en milisegundos
        path: '/',
      });
      return cookie;
    } catch (error) {
      throw new UnauthorizedException('Refresh token expirado o inválido');
    }
  }

  async refresh(id: string, res: Response) {
    const userIdValid = await this.usersRepository.getUserId(id);
    if (!userIdValid) throw new NotFoundException('User not found.');
    try {
      const newAccessToken: JwtPayload = {
        sub: userIdValid.id,
        id: userIdValid.id,
        email: userIdValid.email,
        roles: [userIdValid.isAdmin ? Role.Admin : Role.User],
      };

      // 🕒 Token de acceso 5 minutos
      const newRefreshToken = {
        sub: userIdValid.id,
        type: 'refresh',
        id: userIdValid.id,
        email: userIdValid.email,
        roles: [userIdValid.isAdmin ? Role.Admin : Role.User],
      };
      const refreshToken = this.jwtService.sign(newRefreshToken, {
        expiresIn: '7d',
      });

      // guardar cookie segura
      this.setRefreshCookie(res, refreshToken);
      return { accessToken: newAccessToken };
    } catch (error) {
      throw new UnauthorizedException('Token invalido o expirado.');
    }
  }

  async logout(res: Response): Promise<{
    message: string;
  }> {
    const isProd = process.env.NODE_ENV === 'production';
    try {
      const cook = res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: isProd,
        sameSite: isProd ? 'none' : 'lax',
        path: '/',
      });
      return { message: 'Sesion cerrada correctamente' };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async checkAuth(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>,
  ) {
    try {
      const refreshToken = req.cookies['refreshToken'];
      if (!refreshToken) {
        throw new UnauthorizedException('No hay cookie');
      }

      const payload = this.jwtService.verify(refreshToken);
      // ✅ Si llega aquí, el token es válido
      return res.status(200).json({ valid: true, sub: payload.sub });
    } catch (error) {
      return res.status(401).json({ valid: false });
    }
  }
}
