import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateInventoryDto {
  @IsNumber()
  @IsNotEmpty()
  itemId: number;

  @IsNumber()
  @IsNotEmpty()
  quantity: number;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsNumber()
  @IsNotEmpty()
  salePrice: number;
}
