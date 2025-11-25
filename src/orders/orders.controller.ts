import { Controller, Get, Post, Put, Body, Param, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('orders')
@ApiBearerAuth()
@Controller('orders')
@UseGuards(JwtAuthGuard)
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Post()
  @ApiOperation({ 
    summary: 'Criar pedido a partir do carrinho',
    description: 'Converte os itens do carrinho em um pedido e limpa o carrinho.',
  })
  @ApiResponse({ 
    status: 201, 
    description: 'Pedido criado com sucesso',
    schema: {
      example: {
        id: 'clm1234567890abcdef',
        userId: 'clm0987654321fedcba',
        status: 'PENDING',
        total: 1199.98,
        items: [
          {
            productId: 'clm2222222222222222',
            quantity: 2,
            price: 599.99,
          },
        ],
        createdAt: '2024-01-15T10:30:00.000Z',
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  @ApiResponse({ status: 400, description: 'Carrinho vazio ou endereço inválido' })
  create(@Request() req, @Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(req.user.userId, createOrderDto);
  }

  @Get()
  @ApiOperation({ 
    summary: 'Listar pedidos do usuário',
    description: 'Retorna todos os pedidos do usuário autenticado.',
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Lista de pedidos',
    schema: {
      example: [
        {
          id: 'clm1234567890abcdef',
          status: 'PENDING',
          total: 1199.98,
          createdAt: '2024-01-15T10:30:00.000Z',
        },
      ],
    },
  })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  findAll(@Request() req) {
    return this.ordersService.findAll(req.user.userId);
  }

  @Get(':id')
  @ApiOperation({ 
    summary: 'Buscar pedido por ID',
    description: 'Retorna os detalhes completos de um pedido específico.',
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Pedido encontrado',
    schema: {
      example: {
        id: 'clm1234567890abcdef',
        userId: 'clm0987654321fedcba',
        status: 'PENDING',
        total: 1199.98,
        items: [
          {
            productId: 'clm2222222222222222',
            quantity: 2,
            price: 599.99,
            product: {
              name: 'Smartphone XYZ Pro',
            },
          },
        ],
        createdAt: '2024-01-15T10:30:00.000Z',
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  @ApiResponse({ status: 404, description: 'Pedido não encontrado' })
  findOne(@Request() req, @Param('id') id: string) {
    return this.ordersService.findById(id, req.user.userId);
  }

  @Put(':id/status')
  @ApiOperation({ 
    summary: 'Atualizar status do pedido',
    description: 'Atualiza o status de um pedido (PENDING, PROCESSING, SHIPPED, DELIVERED, CANCELLED).',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        status: {
          type: 'string',
          enum: ['PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'],
          example: 'PROCESSING',
        },
      },
    },
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Status atualizado',
    schema: {
      example: {
        id: 'clm1234567890abcdef',
        status: 'PROCESSING',
        updatedAt: '2024-01-15T11:00:00.000Z',
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  @ApiResponse({ status: 404, description: 'Pedido não encontrado' })
  updateStatus(@Param('id') id: string, @Body('status') status: string) {
    return this.ordersService.updateStatus(id, status);
  }
}
