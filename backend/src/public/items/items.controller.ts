import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
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

  @Post()
  @UseGuards(JwtAuthGuard)
  async addItem(@Body() data: AddItemDto) {
    return this.itemsService.addItem(data);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
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
      return this.itemsService.getItems(Number(start), Number(size));
    }
    return this.itemsService.getItems();
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async updateItemById(@Param('id') id: number, @Body() data: UpdateItemDto) {
    return this.itemsService.updateItemById(Number(id), data);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  async deleteItemById(@Param('id') id: number) {
    return this.itemsService.deleteItemById(Number(id));
  }
}
