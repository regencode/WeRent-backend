import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Product, Prisma } from '@prisma/client';

@Injectable()
export class ProductsRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.ProductCreateInput): Promise<Product> {
    return this.prisma.product.create({ data });
  }

  async findAll(includeReviews = false): Promise<Product[]> {
    return this.prisma.product.findMany({
      include: { reviews: includeReviews },
    });
  }

  

  async findUnique(
    id: number,
    includeReviews = false,
  ): Promise<Product | null> {
    return this.prisma.product.findUnique({
      where: { id },
      include: { reviews: includeReviews },
    });
  }
  async delete(id: number): Promise<Product> {
    return this.prisma.product.delete({ where: { id } });
  }

  async findById(id: number): Promise<Product | null> {
    return this.prisma.product.findUnique({ where: { id } });
  }

  async findMany(args: any): Promise<Product[]> {
  return this.prisma.product.findMany(args)
}
}


