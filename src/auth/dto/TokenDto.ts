import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class TokenDto {
  @ApiProperty({ description: 'Access-token' })
  @IsNotEmpty()
  token: string;
}
