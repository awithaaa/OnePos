import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AddItemDto } from './dto/add-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';

@Injectable()
export class ItemsService {
  constructor(private prisma: PrismaService) {}

  async addItem(data: AddItemDto) {
    const item = await this.prisma.item.create({
      data: {
        name: data.name,
        brand: data.brand,
        suk: data.suk,
        discount: data.discount,
        price: data.price,
        salePrice: data.salePrice,
      },
    });
    return { message: 'Item added succesfully!', item: item };
  }

  async getItems(start?: number, size?: number) {
    if (start !== undefined && size !== undefined) {
      const count = await this.prisma.item.count();
      const items = await this.prisma.item.findMany({
        skip: start,
        take: size,
      });
      return { count, items };
    }
    const count = await this.prisma.item.count();
    const items = await this.prisma.item.findMany({});
    return { count, items };
  }

  async getItemsById(id: number) {
    const item = await this.prisma.item.findUnique({ where: { id: id } });
    if (!item) throw new NotFoundException('Item not found!');
    const count = 1;
    return { item, count };
  }

  async getItemsByName(name: string) {
    const item = await this.prisma.item.findMany({
      where: {
        name: {
          contains: name,
          mode: 'insensitive',
        },
      },
    });
    if (!item) throw new NotFoundException('Items not found!');
    const count = item.length;
    return { item, count };
  }

  async getItemsByBrand(name: string) {
    const item = await this.prisma.item.findMany({
      where: {
        brand: {
          contains: name,
          mode: 'insensitive',
        },
      },
    });
    if (!item) throw new NotFoundException('Items not found!');
    const count = item.length;
    return { item, count };
  }

  async getItemsBySuk(suk: string) {
    const item = await this.prisma.item.findUnique({ where: { suk: suk } });
    if (!item) throw new NotFoundException('Item not found!');
    const count = 1;
    return { item, count };
  }

  async updateItemById(id: number, data: UpdateItemDto) {
    const item = await this.prisma.item.findUnique({ where: { id: id } });
    if (!item) throw new NotFoundException('Items not found!');

    const updateItem = await this.prisma.item.update({
      where: { id: id },
      data: data,
    });
    return { message: 'Item updated succesfully!', item: updateItem };
  }

  async deleteItemById(id: number) {
    const item = await this.prisma.item.findUnique({ where: { id: id } });
    if (!item) throw new NotFoundException('Items not found!');

    await this.prisma.item.delete({ where: { id: id } });
    return { message: 'Item deleted succesfully!' };
  }
}
