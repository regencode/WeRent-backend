import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductsRepository } from './products.repository';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from '@prisma/client';

@Injectable()
export class ProductsService {
  constructor(private productsRepository: ProductsRepository) {}

  async create(dto: CreateProductDto): Promise<Product> {
    return this.productsRepository.create({
      name: dto.name,
      price: dto.price,
    });
  }

  async findAll(): Promise<Product[]> {
    return this.productsRepository.findAll(true);
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.productsRepository.findUnique(id, true);
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  async update(id: number, dto: UpdateProductDto): Promise<Product> {
    const product = await this.productsRepository.findById(id);
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    return this.productsRepository.update(id, {
      name: dto.name ?? undefined,
      price: dto.price ?? undefined,
    });
  }

  async remove(id: number): Promise<void> {
    const product = await this.productsRepository.findById(id);
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    await this.productsRepository.delete(id);
  }
}
