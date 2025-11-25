import { ApiProperty } from '@nestjs/swagger';

export class ProductResponseDto {
  @ApiProperty({ example: 'clm1234567890abcdef' })
  id: string;

  @ApiProperty({ example: 'Smartphone XYZ Pro' })
  name: string;

  @ApiProperty({ example: 'Smartphone de última geração com câmera de 108MP e 5G' })
  description: string;

  @ApiProperty({ example: 599.99 })
  price: number;

  @ApiProperty({ example: 50 })
  stock: number;

  @ApiProperty({ example: 'SMART-XYZ-001' })
  sku: string;

  @ApiProperty({ example: ['https://exemplo.com/img1.jpg', 'https://exemplo.com/img2.jpg'] })
  images: string[];

  @ApiProperty({ example: true })
  isActive: boolean;

  @ApiProperty({ example: 'clm0987654321fedcba' })
  sellerId: string;

  @ApiProperty({ example: 'clm1111111111111111' })
  categoryId: string;

  @ApiProperty({ example: '2024-01-15T10:30:00.000Z' })
  createdAt: Date;

  @ApiProperty({ example: '2024-01-15T10:30:00.000Z' })
  updatedAt: Date;
}
