import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class ProductDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  stock: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  category: string;
}

export class UpdateProduct extends PartialType(ProductDto) {}
