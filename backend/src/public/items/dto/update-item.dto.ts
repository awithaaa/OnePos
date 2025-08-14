import { IsNumber, IsString } from 'class-validator';

export class UpdateItemDto {
  @IsString()
  name?: string;

  @IsString()
  brand?: string;

  @IsNumber()
  price?: number;

  @IsNumber()
  salePrice?: number;
}
