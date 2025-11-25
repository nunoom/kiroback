import { Controller, Get, Post, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { CartService } from './cart.service';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('cart')
@ApiBearerAuth()
@Controller('cart')
@UseGuards(JwtAuthGuard)
export class CartController {
  constructor(private cartService: CartService) {}

  @Get()
  @ApiOperation({ 
    summary: 'Ver carrinho do usuário',
    description: 'Retorna o carrinho de compras do usuário autenticado com todos os itens.',
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Carrinho retornado',
    schema: {
      example: {
        id: 'clm1234567890abcdef',
        userId: 'clm0987654321fedcba',
        items: [
          {
            id: 'clm1111111111111111',
            productId: 'clm2222222222222222',
            quantity: 2,
            product: {
              name: 'Smartphone XYZ Pro',
              price: 599.99,
              images: ['https://exemplo.com/img1.jpg'],
            },
          },
        ],
        total: 1199.98,
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  getCart(@Request() req) {
    return this.cartService.getCart(req.user.userId);
  }

  @Post('items')
  @ApiOperation({ 
    summary: 'Adicionar item ao carrinho',
    description: 'Adiciona um produto ao carrinho ou atualiza a quantidade se já existir.',
  })
  @ApiResponse({ 
    status: 201, 
    description: 'Item adicionado',
    schema: {
      example: {
        message: 'Item adicionado ao carrinho',
        cartItem: {
          id: 'clm1111111111111111',
          productId: 'clm2222222222222222',
          quantity: 2,
        },
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  @ApiResponse({ status: 404, description: 'Produto não encontrado' })
  addItem(@Request() req, @Body() addToCartDto: AddToCartDto) {
    return this.cartService.addItem(req.user.userId, addToCartDto);
  }

  @Delete('items/:productId')
  @ApiOperation({ 
    summary: 'Remover item do carrinho',
    description: 'Remove um produto específico do carrinho.',
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Item removido',
    schema: {
      example: { message: 'Item removido do carrinho' },
    },
  })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  removeItem(@Request() req, @Param('productId') productId: string) {
    return this.cartService.removeItem(req.user.userId, productId);
  }

  @Delete()
  @ApiOperation({ 
    summary: 'Limpar carrinho',
    description: 'Remove todos os itens do carrinho do usuário.',
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Carrinho limpo',
    schema: {
      example: { message: 'Carrinho limpo com sucesso' },
    },
  })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  clearCart(@Request() req) {
    return this.cartService.clearCart(req.user.userId);
  }
}
