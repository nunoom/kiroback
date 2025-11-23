import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSellerDto } from './dto/create-seller.dto';

@Injectable()
export class SellersService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, data: CreateSellerDto) {
    return this.prisma.seller.create({
      data: { ...data, userId },
      include: { user: true }
    });
  }

  async findAll() {
    return this.prisma.seller.findMany({
      where: { isActive: true },
      include: { user: true, products: true }
    });
  }

  async findById(id: string) {
    const seller = await this.prisma.seller.findUnique({
      where: { id },
      include: { user: true, products: true }
    });
    if (!seller) throw new NotFoundException('Vendedor não encontrado');
    return seller;
  }

  async update(id: string, data: any) {
    return this.prisma.seller.update({
      where: { id },
      data,
      include: { user: true }
    });
  }
}
