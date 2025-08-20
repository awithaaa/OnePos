import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateInventoryDto } from './dto/update-inventory.dto';

@Injectable()
export class InventoryService {
  constructor(private prisma: PrismaService) {}

  async createInventory(data: CreateInventoryDto) {
    const inventory = await this.prisma.inventory.create({ data: data });
    return { message: 'Inventory added succesfully!', inventory };
  }

  async getInventoryByItemId(itemId: number) {
    const item = await this.prisma.item.findUnique({ where: { id: itemId } });
    if (!item) throw new NotFoundException('Item not found!');

    const inventory = await this.prisma.inventory.findMany({
      where: { itemId: itemId },
    });

    const emptyInventory = await this.prisma.emptyInventory.findMany({
      where: { itemId: itemId },
    });

    const countEmpty = emptyInventory.length;
    const count = inventory.length;
    return { count, inventory, countEmpty, emptyInventory };
  }

  async getInventoryById(id: number) {
    const inventory = await this.prisma.inventory.findUnique({
      where: { id: id },
    });
    if (!inventory) throw new NotFoundException('Inventory not found!');

    return inventory;
  }

  async updateInventoryById(id: number, data: UpdateInventoryDto) {
    const inventory = await this.prisma.inventory.findUnique({
      where: { id: id },
    });
    if (!inventory) throw new NotFoundException('Inventory not found!');

    const updatedInventory = await this.prisma.inventory.update({
      where: { id: id },
      data: data,
    });

    if (data.quantity === 0) {
      const empty = await this.prisma.emptyInventory.create({
        data: {
          itemId: updatedInventory.itemId,
          quantity: 0,
          stock: updatedInventory.stock,
          price: updatedInventory.price,
          salePrice: updatedInventory.salePrice,
          createdAt: updatedInventory.createdAt,
        },
      });
      await this.prisma.inventory.delete({
        where: { id: updatedInventory.id },
      });
      return {
        message: 'Inventory update successfully & Quantity is Zero',
        updatedInventory,
      };
    }

    return { message: 'Inventory update successfully', updatedInventory };
  }

  async deleteInventoryById(id: number) {
    const inventory = await this.prisma.inventory.findUnique({
      where: { id: id },
    });
    if (!inventory) throw new NotFoundException('Inventory not found!');

    const deletedInventory = await this.prisma.inventory.delete({
      where: { id: id },
    });

    return { message: 'Inventory delete successfully' };
  }
}
