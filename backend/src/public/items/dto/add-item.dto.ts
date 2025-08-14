import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class AddItemDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  brand?: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsNumber()
  @IsNotEmpty()
  salePrice: number;
}
