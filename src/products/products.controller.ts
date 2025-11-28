import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/auth/roles.enum';
import { RolesGuard } from 'src/guards/roles.guard';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ProductDto, UpdateProduct } from './dto/productsDto';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @ApiOperation({
    description: 'USER && ADMIN - Consigue un array de productos de la DB.',
  })
  @UseGuards(AuthGuard)
  getProducts() {
    console.log('llego a este get products');

    return this.productsService.getProducts();
  }

  @Get(':id')
  @ApiResponse({
    description:
      'USER && ADMIN - Consigue los datos del productos segun el ID.',
  })
  getProductsId(@Param('id', ParseUUIDPipe) id: string) {
    return this.productsService.getProductId(id);
  }

  @Post('seeder')
  @ApiOperation({
    description: 'ADMIN - Guardar 1 producto en la DB - Necesita token-cookie',
  })
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  async addProduct(@Body() productDto: ProductDto) {
    return await this.productsService.addProduct(productDto);
  }

  @Put(':id')
  @ApiResponse({
    description:
      'ADMIN - Actualizar el producto segun el ID del producto - Necesita token-cookie',
  })
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  getProductUpdate(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() newData: UpdateProduct,
  ) {
    return this.productsService.putProducto(id, newData);
  }

  @Delete(':id')
  @ApiResponse({
    description:
      'ADMIN - Eliminar el producto segun el ID del producto - Necesita token-cookie',
  })
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  getProductDelete(@Param('id', ParseUUIDPipe) id: string) {
    return this.productsService.deleteProduct(id);
  }
}
