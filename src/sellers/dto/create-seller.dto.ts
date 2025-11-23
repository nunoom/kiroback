import { IsString, IsOptional, IsNumber, Min } from 'class-validator';

export class CreateSellerDto {
  @IsString()
  storeName: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  commission?: number;
}
