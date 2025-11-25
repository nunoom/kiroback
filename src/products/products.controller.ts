import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductResponseDto } from './dto/product-response.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  @ApiOperation({ 
    summary: 'Listar todos os produtos',
    description: 'Retorna uma lista de todos os produtos ativos. Pode ser filtrado por categoria.',
  })
  @ApiQuery({ name: 'categoryId', required: false, description: 'Filtrar por categoria' })
  @ApiResponse({ 
    status: 200, 
    description: 'Lista de produtos',
    type: [ProductResponseDto],
  })
  findAll(@Query('categoryId') categoryId?: string) {
    return this.productsService.findAll(categoryId);
  }

  @Get(':id')
  @ApiOperation({ 
    summary: 'Buscar produto por ID',
    description: 'Retorna os detalhes completos de um produto específico.',
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Produto encontrado',
    type: ProductResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Produto não encontrado' })
  findOne(@Param('id') id: string) {
    return this.productsService.findById(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ 
    summary: 'Criar novo produto',
    description: 'Cria um novo produto no catálogo. Requer autenticação de vendedor. Se sellerId não for fornecido, usa o seller do usuário autenticado.',
  })
  @ApiResponse({ 
    status: 201, 
    description: 'Produto criado com sucesso',
    type: ProductResponseDto,
  })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  @ApiResponse({ status: 400, description: 'Dados inválidos ou usuário não é vendedor' })
  @ApiResponse({ status: 404, description: 'Vendedor ou categoria não encontrados' })
  create(@Request() req, @Body() createProductDto: CreateProductDto) {
    return this.productsService.create(req.user.userId, createProductDto);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ 
    summary: 'Atualizar produto',
    description: 'Atualiza as informações de um produto existente. Requer autenticação.',
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Produto atualizado',
    type: ProductResponseDto,
  })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  @ApiResponse({ status: 404, description: 'Produto não encontrado' })
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ 
    summary: 'Deletar produto',
    description: 'Remove um produto do catálogo. Requer autenticação.',
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Produto deletado',
    schema: {
      example: { message: 'Produto deletado com sucesso' },
    },
  })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  @ApiResponse({ status: 404, description: 'Produto não encontrado' })
  delete(@Param('id') id: string) {
    return this.productsService.delete(id);
  }
}
