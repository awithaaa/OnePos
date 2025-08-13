import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AddItemDto } from './dto/add-item.dto';

@Injectable()
export class ItemsService {
  constructor(private prisma: PrismaService) {}

  async addItem(data: AddItemDto) {
    const item = this.prisma.item.create({ data: data });
    return { message: 'Item Added Succesfully!', item: item };
  }

  async getItems(start?: number, size?: number) {
    if (start) {
      return this.prisma.item.findMany({ skip: start, take: size });
    }
    return this.prisma.item.findMany();
  }

  async getItemsById(id: number) {
    const item = this.prisma.item.findUnique({ where: { id: id } });
    if (!item) throw new NotFoundException('Item not found!');
    return item;
  }

  async getItemsByName(name: string) {
    const item = this.prisma.item.findMany({ where: { name: name } });
    if (!item) throw new NotFoundException('Items not found!');
    return item;
  }
}
