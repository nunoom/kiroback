import { IsString, IsNumber, IsArray, IsBoolean, IsOptional, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({
    description: 'Nome do produto',
    example: 'Smartphone XYZ Pro',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Descrição detalhada do produto',
    example: 'Smartphone de última geração com câmera de 108MP e 5G',
  })
  @IsString()
  description: string;

  @ApiProperty({
    description: 'Preço do produto',
    example: 599.99,
    minimum: 0,
  })
  @IsNumber()
  @Min(0)
  price: number;

  @ApiProperty({
    description: 'Quantidade em estoque',
    example: 50,
    minimum: 0,
  })
  @IsNumber()
  @Min(0)
  stock: number;

  @ApiProperty({
    description: 'Código SKU único do produto',
    example: 'SMART-XYZ-001',
  })
  @IsString()
  sku: string;

  @ApiProperty({
    description: 'URLs das imagens do produto',
    example: ['https://exemplo.com/img1.jpg', 'https://exemplo.com/img2.jpg'],
    type: [String],
  })
  @IsArray()
  @IsString({ each: true })
  images: string[];

  @ApiPropertyOptional({
    description: 'Se o produto está ativo para venda',
    example: true,
    default: true,
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiProperty({
    description: 'ID do vendedor',
    example: 'clm1234567890abcdef',
  })
  @IsString()
  sellerId: string;

  @ApiProperty({
    description: 'ID da categoria',
    example: 'clm0987654321fedcba',
  })
  @IsString()
  categoryId: string;
}
