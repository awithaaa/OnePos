import { IsNumber, IsString } from 'class-validator';

export class UpdateItemDto {
  @IsString()
  name?: string;

  @IsString()
  brand?: string;

  @IsString()
  suk?: string;

  @IsNumber()
  discount?: number;

  @IsNumber()
  price?: number;

  @IsNumber()
  salePrice?: number;
}
