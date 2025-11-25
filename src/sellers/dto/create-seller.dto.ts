import { IsString, IsOptional, IsNumber, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateSellerDto {
  @ApiProperty({
    description: 'Nome da loja do vendedor',
    example: 'Tech Store Premium',
  })
  @IsString()
  storeName: string;

  @ApiPropertyOptional({
    description: 'Descrição da loja',
    example: 'Loja especializada em produtos de tecnologia e eletrônicos',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    description: 'Taxa de comissão do vendedor (em percentual)',
    example: 15,
    minimum: 0,
    default: 10,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  commission?: number;
}
