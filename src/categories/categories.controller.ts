import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth.guard';

import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/auth/roles.enum';
import { RolesGuard } from 'src/guards/roles.guard';
import { CategoryDto } from './dto/category.dto';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  @ApiOperation({
    description: 'Necesita JWT en cookie. Devuelve un array de categorias',
  })
  @UseGuards(AuthGuard)
  async getCategories() {
    return await this.categoriesService.getCategories();
  }

  @Post('seeder')
  @ApiOperation({
    description: 'ADMIN- Necesita JWT en cookie. Crea una categoria nueva',
  })
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  async seedCategories(@Body() categorie: CategoryDto) {
    return await this.categoriesService.addCategories(categorie.name);
  }
}
