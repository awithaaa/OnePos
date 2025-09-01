import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSalesDto } from './dto/create-sales.dto';

@Injectable()
export class SalesService {
  constructor(private prisma: PrismaService) {}

  async createSale(data: CreateSalesDto, userId: number) {
    const { saleItems, ...sales } = data;
    const sale = await this.prisma.sale.create({
      data: { userId: userId, ...sales },
    });
    for (const saleItem of saleItems) {
      const si = await this.prisma.saleItem.create({
        data: { saleId: sale.id, ...saleItem },
      });
    }

    return { message: 'Sales add succesfully!' };
  }

  async getSales(start?: number, size?: number) {
    if (start !== undefined && size !== undefined) {
      const count = await this.prisma.sale.count();
      const sales = await this.prisma.sale.findMany({
        skip: start,
        take: size,
      });
      return { count, sales };
    }
    const count = await this.prisma.sale.count();
    const sales = await this.prisma.sale.findMany({});
    return { count, sales };
  }

  async getSaleById(id: number) {
    const sale = await this.prisma.sale.findUnique({ where: { id: id } });
    if (!sale) throw new NotFoundException('Sale not found!');
    const count = 1;
    return { sale, count };
  }

  async getSalesByCustomer(name: string) {
    const sale = await this.prisma.sale.findMany({
      where: {
        customer: {
          contains: name,
          mode: 'insensitive',
        },
      },
    });
    if (!sale) throw new NotFoundException('Sales not found!');
    const count = sale.length;
    return { sale, count };
  }

  async getSaleWithItems(id: number) {
    const sale = await this.prisma.sale.findUnique({ where: { id: id } });
    if (!sale) throw new NotFoundException('Sale not found!');

    const saleItems = await this.prisma.saleItem.findMany({
      where: { saleId: sale.id },
    });
    return { sale, saleItems };
  }
}
