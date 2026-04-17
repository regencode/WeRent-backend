import { Optional } from '@nestjs/common';
import { IsString, IsNotEmpty, IsNumber, Min, Max, IsArray } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  brand: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  price: number;

  @IsArray()
  @Optional()
  imageUrls?: string[];
}
