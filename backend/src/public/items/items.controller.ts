import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ItemsService } from './items.service';
import { AddItemDto } from './dto/add-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';

@Controller('items')
export class ItemsController {
  constructor(private itemsService: ItemsService) {}

  @Post()
  async addItem(@Body() data: AddItemDto) {
    return this.itemsService.addItem(data);
  }

  @Get()
  async getItems(
    @Query('start') start: number,
    @Query('size') size: number,
    @Query('id') id: number,
    @Query('name') name: string,
  ) {
    if (start) return this.itemsService.getItems(start, size);
    if (id) return this.itemsService.getItemsById(id);
    if (name) return this.itemsService.getItemsByName(name);
    return this.itemsService.getItems();
  }

  @Patch(':id')
  async updateItemById(@Param('id') id: number, @Body() data: UpdateItemDto) {
    return this.itemsService.updateItemById(id, data);
  }

  @Delete(':id')
  async deleteItemById(@Param('id') id: number) {
    return this.itemsService.deleteItemById(id);
  }
}
