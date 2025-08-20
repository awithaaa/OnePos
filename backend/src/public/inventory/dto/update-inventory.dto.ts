import { IsNumber, IsOptional } from 'class-validator';

export class UpdateInventoryDto {
  @IsNumber()
  @IsOptional()
  quantity?: number;

  @IsNumber()
  @IsOptional()
  stock?: number;

  @IsNumber()
  @IsOptional()
  price?: number;

  @IsNumber()
  @IsOptional()
  salePrice?: number;
}
