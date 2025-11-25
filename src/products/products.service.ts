import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, data: CreateProductDto) {
    // Se sellerId não foi fornecido, busca o seller do usuário autenticado
    let sellerId = data.sellerId;
    
    if (!sellerId) {
      const seller = await this.prisma.seller.findUnique({
        where: { userId },
      });
      
      if (!seller) {
        throw new BadRequestException(
          'Usuário não possui perfil de vendedor. Crie um perfil de vendedor primeiro em /sellers'
        );
      }
      
      sellerId = seller.id;
    } else {
      // Valida se o sellerId fornecido existe
      const seller = await this.prisma.seller.findUnique({
        where: { id: sellerId },
      });
      
      if (!seller) {
        throw new NotFoundException(`Vendedor com ID ${sellerId} não encontrado`);
      }
    }

    // Valida se a categoria existe
    const category = await this.prisma.category.findUnique({
      where: { id: data.categoryId },
    });
    
    if (!category) {
      throw new NotFoundException(`Categoria com ID ${data.categoryId} não encontrada`);
    }

    return this.prisma.product.create({ 
      data: {
        ...data,
        sellerId,
      },
      include: { seller: true, category: true }
    });
  }

  async findAll(categoryId?: string) {
    return this.prisma.product.findMany({
      where: categoryId ? { categoryId } : undefined,
      include: { seller: true, category: true }
    });
  }

  async findById(id: string) {
    const product = await this.prisma.product.findUnique({ 
      where: { id },
      include: { seller: true, category: true }
    });
    if (!product) throw new NotFoundException('Produto não encontrado');
    return product;
  }

  async update(id: string, data: UpdateProductDto) {
    return this.prisma.product.update({ 
      where: { id }, 
      data,
      include: { seller: true, category: true }
    });
  }

  async delete(id: string) {
    return this.prisma.product.delete({ where: { id } });
  }
}
