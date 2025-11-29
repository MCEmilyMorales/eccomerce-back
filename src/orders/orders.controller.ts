import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/CreateOrderDto';
import { AuthGuard } from 'src/guards/auth.guard';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/auth/roles.enum';
import { RolesGuard } from 'src/guards/roles.guard';
import { CurrentUser } from 'src/decorators/current-user.decorator';

@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @ApiOperation({
    description:
      'Necesita cookie-token. Recibe un objeto de array de string con los ids de los productos, cantidad. \n Crea una orden, crea un detalle de la orden y guarda el price en la misma',
  })
  @UseGuards(AuthGuard)
  async addOrder(
    @CurrentUser('id', ParseUUIDPipe) userId: string,
    @Body() { products }: CreateOrderDto,
  ) {
    const order = await this.ordersService.addOrder(userId, products);
    return order;
  }

  @Get(':id')
  @ApiOperation({
    description: 'Necesita cookie-token. Detalles de orden segun ID de ORDEN.',
  })
  @ApiResponse({
    description: 'Devuelve fecha, total y detalles de producto.',
  })
  @UseGuards(AuthGuard)
  async getOrder(@Param('id', ParseUUIDPipe) id: string) {
    return await this.ordersService.getOrder(id);
  }

  @Get('according-to/user-id')
  @ApiOperation({
    description:
      'Necesita cookie-token. Busca todas las ordenes del usuario autenticado.',
  })
  @ApiResponse({
    description: 'Devuelve IDs de orden y fecha de la creacion de la misma.',
  })
  @Roles(Role.User, Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  async getOrderIdUser(@CurrentUser('id', ParseUUIDPipe) id: string) {
    return await this.ordersService.getOrderIdUser(id);
  }
}
