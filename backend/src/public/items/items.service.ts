import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AddItemDto } from './dto/add-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';

@Injectable()
export class ItemsService {
  constructor(private prisma: PrismaService) {}

  async addItem(data: AddItemDto) {
    const item = this.prisma.item.create({ data: data });
    return { message: 'Item added succesfully!', item: item };
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

  async updateItemById(id: number, data: UpdateItemDto) {
    const item = this.prisma.item.findUnique({ where: { id: id } });
    if (!item) throw new NotFoundException('Items not found!');

    const updateItem = this.prisma.item.update({
      where: { id: id },
      data: data,
    });
    return { message: 'Item updated succesfully!', item: updateItem };
  }

  async deleteItemById(id: number) {
    const item = this.prisma.item.findUnique({ where: { id: id } });
    if (!item) throw new NotFoundException('Items not found!');

    this.prisma.item.delete({ where: { id: id } });
    return { message: 'Item deleted succesfully!' };
  }
}
