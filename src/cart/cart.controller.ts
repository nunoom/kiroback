import { Controller, Get, Post, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { CartService } from './cart.service';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('cart')
@ApiBearerAuth('JWT-auth')
@Controller('cart')
@UseGuards(JwtAuthGuard)
export class CartController {
  constructor(private cartService: CartService) {}

  @Get()
  @ApiOperation({ summary: 'Ver carrinho do usuário' })
  @ApiResponse({ status: 200, description: 'Carrinho retornado' })
  getCart(@Request() req) {
    return this.cartService.getCart(req.user.userId);
  }

  @Post('items')
  @ApiOperation({ summary: 'Adicionar item ao carrinho' })
  @ApiResponse({ status: 201, description: 'Item adicionado' })
  addItem(@Request() req, @Body() addToCartDto: AddToCartDto) {
    return this.cartService.addItem(req.user.userId, addToCartDto);
  }

  @Delete('items/:productId')
  @ApiOperation({ summary: 'Remover item do carrinho' })
  @ApiResponse({ status: 200, description: 'Item removido' })
  removeItem(@Request() req, @Param('productId') productId: string) {
    return this.cartService.removeItem(req.user.userId, productId);
  }

  @Delete()
  @ApiOperation({ summary: 'Limpar carrinho' })
  @ApiResponse({ status: 200, description: 'Carrinho limpo' })
  clearCart(@Request() req) {
    return this.cartService.clearCart(req.user.userId);
  }
}
