import {
  Body,
  Controller,
  Get,
  ParseUUIDPipe,
  Post,
  Req,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/LoginUserDto';

import { CreateUserDto } from 'src/users/dto/CreateUserDto';
import { HideCredentialInterceptor } from 'src/interceptors/hide-credential.interceptor';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { TokenDto } from './dto/TokenDto';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { AuthGuard } from 'src/guards/auth.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  async signIn(
    @Res() res: Response,
    @Body() { email, password }: LoginUserDto,
  ) {
    const sign = await this.authService.signIn(email, password, res);
    console.log('exito en la devolucion del signin');

    return res.json(sign);
  }

  @Post('signup')
  @UseInterceptors(HideCredentialInterceptor)
  async signUp(@Body() user: CreateUserDto) {
    return await this.authService.signUp(user);
  }

  @Post('me')
  @ApiOperation({
    description: 'Lee cookie-token, devuelve el id',
  })
  @UseGuards(AuthGuard)
  async me(@CurrentUser('id', ParseUUIDPipe) id: string) {
    return { id: id };
  }

  @Post('refresh')
  @ApiOperation({
    description: 'Lee cookie-token y retorna el nuevo accessToken',
  })
  @UseGuards(AuthGuard)
  async refresh(
    @CurrentUser('id', ParseUUIDPipe) id: string,
    @Res() res: Response,
  ) {
    const refresh = await this.authService.refresh(id, res);
    return res.json(refresh);
  }

  @Post('logout')
  @ApiOperation({
    description: 'Cierra sesion y elimina la cookie',
  })
  async logout(@Res() res: Response) {
    return res.json(await this.authService.logout(res));
  }

  @Get('check')
  async checkAuth(@Req() req: Request, @Res() res: Response) {
    return res.json(await this.authService.checkAuth(req, res));
  }
}
