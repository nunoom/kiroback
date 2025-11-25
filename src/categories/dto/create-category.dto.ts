import { IsString, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty({
    description: 'Nome da categoria',
    example: 'Eletrônicos',
  })
  @IsString()
  name: string;

  @ApiPropertyOptional({
    description: 'Descrição da categoria',
    example: 'Produtos eletrônicos e tecnologia',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'Slug único da categoria (URL-friendly)',
    example: 'eletronicos',
  })
  @IsString()
  slug: string;
}
