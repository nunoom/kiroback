import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, data: CreateOrderDto) {
    const cart = await this.prisma.cart.findUnique({
      where: { userId },
      include: { items: { include: { product: true } } }
    });

    if (!cart || cart.items.length === 0) {
      throw new BadRequestException('Carrinho vazio');
    }

    const total = cart.items.reduce((sum, item) => 
      sum + (item.product.price * item.quantity), 0
    );

    const order = await this.prisma.order.create({
      data: {
        userId,
        addressId: data.addressId,
        total,
        items: {
          create: cart.items.map(item => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.product.price
          }))
        }
      },
      include: { items: { include: { product: true } }, address: true }
    });

    await this.prisma.cartItem.deleteMany({ where: { cartId: cart.id } });

    return order;
  }

  async findAll(userId: string) {
    return this.prisma.order.findMany({
      where: { userId },
      include: { items: { include: { product: true } }, address: true },
      orderBy: { createdAt: 'desc' }
    });
  }

  async findById(id: string, userId: string) {
    return this.prisma.order.findFirst({
      where: { id, userId },
      include: { items: { include: { product: true } }, address: true }
    });
  }

  async updateStatus(id: string, status: string) {
    return this.prisma.order.update({
      where: { id },
      data: { status: status as any }
    });
  }
}
