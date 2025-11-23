import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateProductDto) {
    return this.prisma.product.create({ 
      data,
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
