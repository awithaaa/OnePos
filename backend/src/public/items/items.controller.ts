import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ItemsService } from './items.service';
import { AddItemDto } from './dto/add-item.dto';

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
}
