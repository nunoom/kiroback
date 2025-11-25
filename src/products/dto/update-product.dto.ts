import { IsString, IsNumber, IsArray, IsBoolean, IsOptional, Min } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateProductDto {
  @ApiPropertyOptional({
    description: 'Nome do produto',
    example: 'Smartphone XYZ Pro Max',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    description: 'Descrição detalhada do produto',
    example: 'Smartphone de última geração com câmera de 108MP, 5G e bateria de longa duração',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    description: 'Preço do produto',
    example: 649.99,
    minimum: 0,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  price?: number;

  @ApiPropertyOptional({
    description: 'Quantidade em estoque',
    example: 75,
    minimum: 0,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  stock?: number;

  @ApiPropertyOptional({
    description: 'URLs das imagens do produto',
    example: ['https://exemplo.com/img1.jpg', 'https://exemplo.com/img2.jpg', 'https://exemplo.com/img3.jpg'],
    type: [String],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  images?: string[];

  @ApiPropertyOptional({
    description: 'Se o produto está ativo para venda',
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiPropertyOptional({
    description: 'ID da categoria',
    example: 'clm0987654321fedcba',
  })
  @IsOptional()
  @IsString()
  categoryId?: string;
}
