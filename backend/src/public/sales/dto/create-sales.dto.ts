import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { CreateSalesItemDto } from './create-sales-item.dto';

export class CreateSalesDto {
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @IsNumber()
  @IsNotEmpty()
  total: number;

  @IsString()
  @IsOptional()
  customer?: string;

  @IsBoolean()
  @IsOptional()
  draft?: boolean;

  @IsOptional()
  saleItems: CreateSalesItemDto[];
}
