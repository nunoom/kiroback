import { Controller, Get, Post, Put, Body, Param, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { SellersService } from './sellers.service';
import { CreateSellerDto } from './dto/create-seller.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('sellers')
@Controller('sellers')
export class SellersController {
  constructor(private sellersService: SellersService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todos os vendedores' })
  findAll() {
    return this.sellersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar vendedor por ID' })
  findOne(@Param('id') id: string) {
    return this.sellersService.findById(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Criar perfil de vendedor' })
  create(@Request() req, @Body() createSellerDto: CreateSellerDto) {
    return this.sellersService.create(req.user.userId, createSellerDto);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Atualizar perfil de vendedor' })
  update(@Param('id') id: string, @Body() updateData: any) {
    return this.sellersService.update(id, updateData);
  }
}
