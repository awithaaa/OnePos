import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ItemsService } from './items.service';
import { AddItemDto } from './dto/add-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Controller('items')
export class ItemsController {
  constructor(private itemsService: ItemsService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Post()
  async addItem(@Body() data: AddItemDto) {
    return this.itemsService.addItem(data);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getItems(
    @Query('start') start?: string,
    @Query('size') size?: string,
    @Query('id') id?: string,
    @Query('name') name?: string,
  ) {
    if (id) {
      return this.itemsService.getItemsById(Number(id));
    }
    if (name) {
      return this.itemsService.getItemsByName(name);
    }
    if (start !== undefined && size !== undefined) {
      return this.itemsService.getItems({
        start: Number(start),
        size: Number(size),
      });
    }
    return this.itemsService.getItems();
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async updateItemById(@Param('id') id: number, @Body() data: UpdateItemDto) {
    return this.itemsService.updateItemById(id, data);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Delete(':id')
  async deleteItemById(@Param('id') id: number) {
    return this.itemsService.deleteItemById(id);
  }
}
