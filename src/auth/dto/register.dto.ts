import { IsEmail, IsString, MinLength, IsEnum, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({
    description: 'Email do usuário',
    example: 'novo@exemplo.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Senha do usuário',
    example: 'senha123',
    minLength: 6,
  })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({
    description: 'Nome completo do usuário',
    example: 'João Silva',
  })
  @IsString()
  name: string;

  @ApiPropertyOptional({
    description: 'Telefone do usuário',
    example: '+351912345678',
  })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiPropertyOptional({
    description: 'Papel do usuário no sistema',
    enum: ['CUSTOMER', 'SELLER', 'ADMIN'],
    example: 'CUSTOMER',
    default: 'CUSTOMER',
  })
  @IsOptional()
  @IsEnum(['CUSTOMER', 'SELLER', 'ADMIN'])
  role?: string;
}
