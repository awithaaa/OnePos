import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSalesDto } from './dto/create-sales.dto';

@Injectable()
export class SalesService {
  constructor(private prisma: PrismaService) {}

  async createSale(data: CreateSalesDto) {
    const { saleItems, ...sales } = data;
    const sale = await this.prisma.sale.create({ data: sales });
    for (const saleItem of saleItems) {
      const si = await this.prisma.saleItem.create({ data: saleItem });
    }

    return { message: 'Sales add succesfully!' };
  }
}
