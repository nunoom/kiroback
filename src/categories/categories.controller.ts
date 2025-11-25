import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Get()
  @ApiOperation({ 
    summary: 'Listar todas as categorias',
    description: 'Retorna uma lista de todas as categorias disponíveis.',
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Lista de categorias',
    schema: {
      example: [
        {
          id: 'clm1234567890abcdef',
          name: 'Eletrônicos',
          description: 'Produtos eletrônicos e tecnologia',
          slug: 'eletronicos',
          createdAt: '2024-01-15T10:30:00.000Z',
        },
      ],
    },
  })
  findAll() {
    return this.categoriesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ 
    summary: 'Buscar categoria por ID',
    description: 'Retorna os detalhes de uma categoria específica.',
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Categoria encontrada',
    schema: {
      example: {
        id: 'clm1234567890abcdef',
        name: 'Eletrônicos',
        description: 'Produtos eletrônicos e tecnologia',
        slug: 'eletronicos',
        createdAt: '2024-01-15T10:30:00.000Z',
      },
    },
  })
  @ApiResponse({ status: 404, description: 'Categoria não encontrada' })
  findOne(@Param('id') id: string) {
    return this.categoriesService.findById(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ 
    summary: 'Criar nova categoria',
    description: 'Cria uma nova categoria de produtos. Requer autenticação de admin.',
  })
  @ApiResponse({ 
    status: 201, 
    description: 'Categoria criada com sucesso',
    schema: {
      example: {
        id: 'clm1234567890abcdef',
        name: 'Eletrônicos',
        description: 'Produtos eletrônicos e tecnologia',
        slug: 'eletronicos',
        createdAt: '2024-01-15T10:30:00.000Z',
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ 
    summary: 'Atualizar categoria',
    description: 'Atualiza as informações de uma categoria existente.',
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Categoria atualizada',
    schema: {
      example: {
        id: 'clm1234567890abcdef',
        name: 'Eletrônicos e Tecnologia',
        description: 'Produtos eletrônicos, tecnologia e gadgets',
        slug: 'eletronicos',
        updatedAt: '2024-01-15T11:00:00.000Z',
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  @ApiResponse({ status: 404, description: 'Categoria não encontrada' })
  update(@Param('id') id: string, @Body() updateData: any) {
    return this.categoriesService.update(id, updateData);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ 
    summary: 'Deletar categoria',
    description: 'Remove uma categoria do sistema.',
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Categoria deletada',
    schema: {
      example: { message: 'Categoria deletada com sucesso' },
    },
  })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  @ApiResponse({ status: 404, description: 'Categoria não encontrada' })
  delete(@Param('id') id: string) {
    return this.categoriesService.delete(id);
  }
}
