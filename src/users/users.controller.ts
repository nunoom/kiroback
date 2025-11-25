import { Controller, Get, Param, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('users')
@ApiBearerAuth()
@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('me')
  @ApiOperation({ 
    summary: 'Ver perfil do usuário logado',
    description: 'Retorna as informações do perfil do usuário autenticado.',
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Perfil do usuário',
    schema: {
      example: {
        id: 'clm1234567890abcdef',
        email: 'usuario@exemplo.com',
        name: 'João Silva',
        phone: '+351912345678',
        role: 'CUSTOMER',
        createdAt: '2024-01-15T10:30:00.000Z',
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  getProfile(@Request() req) {
    return this.usersService.findById(req.user.userId);
  }

  @Get(':id')
  @ApiOperation({ 
    summary: 'Buscar usuário por ID',
    description: 'Retorna as informações de um usuário específico.',
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Usuário encontrado',
    schema: {
      example: {
        id: 'clm1234567890abcdef',
        email: 'usuario@exemplo.com',
        name: 'João Silva',
        phone: '+351912345678',
        role: 'CUSTOMER',
        createdAt: '2024-01-15T10:30:00.000Z',
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado' })
  findOne(@Param('id') id: string) {
    return this.usersService.findById(id);
  }
}
