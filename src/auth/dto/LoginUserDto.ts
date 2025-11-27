import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({
    description: 'Debe ser un Email válido',
    example: 'example@email.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'La password debe contener mínimo 8 caracteres',
    example: '********',
  })
  @IsString()
  @Length(8, 15)
  @IsNotEmpty()
  password: string;
}
