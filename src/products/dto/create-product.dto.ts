import { IsString, IsNumber, IsArray, IsBoolean, IsOptional, Min } from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsNumber()
  @Min(0)
  price: number;

  @IsNumber()
  @Min(0)
  stock: number;

  @IsString()
  sku: string;

  @IsArray()
  @IsString({ each: true })
  images: string[];

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsString()
  sellerId: string;

  @IsString()
  categoryId: string;
}
