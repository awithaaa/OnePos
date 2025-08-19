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
import { InventoryService } from './inventory.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { UpdateInventoryDto } from './dto/update-inventory.dto';

@Controller('inventory')
export class InventoryController {
  constructor(private inventoryService: InventoryService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  async createInventory(@Body() data: CreateInventoryDto) {
    return this.inventoryService.createInventory(data);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getInventoryByItemId(@Query('itemId') itemId: number) {
    return this.inventoryService.getInventoryByItemId(itemId);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async getInventoryById(@Param('id') id: number) {
    return this.inventoryService.getInventoryById(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  async updateInventoryById(
    @Param('id') id: number,
    @Body() data: UpdateInventoryDto,
  ) {
    return this.inventoryService.updateInventoryById(id, data);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  async deleteInventoryById(@Param('id') id: number) {
    return this.inventoryService.deleteInventoryById(id);
  }
}
