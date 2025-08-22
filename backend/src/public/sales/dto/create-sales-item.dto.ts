import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateSalesItemDto {
  @IsNumber()
  @IsNotEmpty()
  itemId: number;

  @IsNumber()
  @IsNotEmpty()
  quantity: number;

  @IsNumber()
  @IsOptional()
  discount?: number;

  @IsNumber()
  @IsNotEmpty()
  price: number;
}
