import {
  Body,
  Controller,
  Delete,
  Get,
  ParseUUIDPipe,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import { HideCredentialInterceptor } from 'src/interceptors/hide-credential.interceptor';
import { ActualizarUserDto } from './dto/CreateUserDto';
import { AuthGuard } from 'src/guards/auth.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/auth/roles.enum';
import { RolesGuard } from 'src/guards/roles.guard';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  //?Debe acceder solo el administrador
  @Get()
  @ApiResponse({
    description: 'ADMIN- consigue un array con todos los usuarios de la DB',
  })
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @UseInterceptors(HideCredentialInterceptor)
  getUsers() {
    return this.userService.getUsers();
  }

  @Get('get-according-to-token')
  @ApiResponse({
    description:
      'ADMIN && USER- Requiere token en cookie; Consigue datos segun token',
  })
  @Roles(Role.User, Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @UseInterceptors(HideCredentialInterceptor)
  getUserId(@CurrentUser('id') id: string) {
    return this.userService.getUserId(id);
  }

  @Put('update-according-to-token')
  @ApiResponse({
    description:
      'USER - Actualiza datos segun el token del usuario. Devuelve mensaje de exito',
  })
  @Roles(Role.User)
  @UseGuards(AuthGuard, RolesGuard)
  async putUserUpdate(
    @CurrentUser('id', ParseUUIDPipe) id: string,
    @Body() newUser: ActualizarUserDto,
  ) {
    return await this.userService.putUserUpdate(id, newUser);
  }

  @Delete('delete-according-to-token')
  @ApiResponse({
    description:
      'USER && ADMIN - Elimina el usuario de la DB segun su token. Devuelve mensaje de exito.',
  })
  @Roles(Role.Admin, Role.User)
  @UseGuards(AuthGuard, RolesGuard)
  async deleteUserDelete(@CurrentUser('id', ParseUUIDPipe) id: string) {
    return await this.userService.deleteUserDelete(id);
  }
}
