import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { SalesService } from './sales.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateSalesDto } from './dto/create-sales.dto';

@Controller('sales')
export class SalesController {
  constructor(private salesService: SalesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async createSale(@Request() req, @Body() data: CreateSalesDto) {
    return this.salesService.createSale(data, req.user.userId);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getSales(@Query('start') start?: string, @Query('size') size?: string) {
    if (start !== undefined && size !== undefined) {
      return this.salesService.getSales(Number(start), Number(size));
    }
    return this.salesService.getSales();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async getSaleWithItems(@Param('id') id: number) {
    return this.salesService.getSaleWithItems(Number(id));
  }
}
