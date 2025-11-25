import { ApiProperty } from '@nestjs/swagger';

export class AuthResponseDto {
  @ApiProperty({
    description: 'Token JWT de acesso',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  access_token: string;

  @ApiProperty({
    description: 'Dados do usuário',
    example: {
      id: 'clm1234567890abcdef',
      email: 'usuario@exemplo.com',
      name: 'João Silva',
      role: 'CUSTOMER',
    },
  })
  user: {
    id: string;
    email: string;
    name: string;
    role: string;
  };
}
