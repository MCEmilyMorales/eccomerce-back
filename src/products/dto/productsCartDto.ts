import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsUUID } from 'class-validator';

export class ProductCartDto {
  @ApiProperty({ description: 'string-id del producto' })
  @IsNotEmpty()
  @IsUUID()
  id: string;

  @ApiProperty({ description: 'string-cantidad de productos requeridos' })
  @IsNotEmpty()
  @IsNumber()
  quantity: number;
}
