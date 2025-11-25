import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
  @ApiProperty({
    description: 'ID do endereço de entrega',
    example: 'clm1234567890abcdef',
  })
  @IsString()
  addressId: string;
}
