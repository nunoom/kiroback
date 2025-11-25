import { Controller, Get, Post, Put, Body, Param, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { SellersService } from './sellers.service';
import { CreateSellerDto } from './dto/create-seller.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('sellers')
@Controller('sellers')
export class SellersController {
  constructor(private sellersService: SellersService) {}

  @Get()
  @ApiOperation({ 
    summary: 'Listar todos os vendedores',
    description: 'Retorna uma lista de todos os vendedores cadastrados na plataforma.',
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Lista de vendedores',
    schema: {
      example: [
        {
          id: 'clm1234567890abcdef',
          userId: 'clm0987654321fedcba',
          storeName: 'Tech Store Premium',
          description: 'Loja especializada em produtos de tecnologia',
          commission: 15,
          isActive: true,
          createdAt: '2024-01-15T10:30:00.000Z',
        },
      ],
    },
  })
  findAll() {
    return this.sellersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ 
    summary: 'Buscar vendedor por ID',
    description: 'Retorna os detalhes de um vendedor específico.',
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Vendedor encontrado',
    schema: {
      example: {
        id: 'clm1234567890abcdef',
        userId: 'clm0987654321fedcba',
        storeName: 'Tech Store Premium',
        description: 'Loja especializada em produtos de tecnologia',
        commission: 15,
        isActive: true,
        createdAt: '2024-01-15T10:30:00.000Z',
        user: {
          name: 'João Silva',
          email: 'joao@exemplo.com',
        },
      },
    },
  })
  @ApiResponse({ status: 404, description: 'Vendedor não encontrado' })
  findOne(@Param('id') id: string) {
    return this.sellersService.findById(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ 
    summary: 'Criar perfil de vendedor',
    description: 'Cria um perfil de vendedor para o usuário autenticado.',
  })
  @ApiResponse({ 
    status: 201, 
    description: 'Perfil de vendedor criado',
    schema: {
      example: {
        id: 'clm1234567890abcdef',
        userId: 'clm0987654321fedcba',
        storeName: 'Tech Store Premium',
        description: 'Loja especializada em produtos de tecnologia',
        commission: 15,
        isActive: true,
        createdAt: '2024-01-15T10:30:00.000Z',
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  @ApiResponse({ status: 400, description: 'Usuário já possui perfil de vendedor' })
  create(@Request() req, @Body() createSellerDto: CreateSellerDto) {
    return this.sellersService.create(req.user.userId, createSellerDto);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ 
    summary: 'Atualizar perfil de vendedor',
    description: 'Atualiza as informações do perfil de vendedor.',
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Perfil atualizado',
    schema: {
      example: {
        id: 'clm1234567890abcdef',
        storeName: 'Tech Store Premium Plus',
        description: 'Loja especializada em produtos de tecnologia e eletrônicos',
        commission: 12,
        updatedAt: '2024-01-15T11:00:00.000Z',
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  @ApiResponse({ status: 404, description: 'Vendedor não encontrado' })
  update(@Param('id') id: string, @Body() updateData: any) {
    return this.sellersService.update(id, updateData);
  }
}
