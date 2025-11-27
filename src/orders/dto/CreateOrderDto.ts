import { ApiProperty } from '@nestjs/swagger';
import { ArrayMinSize, IsArray, IsNotEmpty, IsUUID } from 'class-validator';
import { ProductCartDto } from 'src/products/dto/productsCartDto';

export class CreateOrderDto {
  @ApiProperty({ description: 'Array de producto', type: [ProductCartDto] })
  @IsArray()
  @ArrayMinSize(1)
  products: ProductCartDto[];
}
