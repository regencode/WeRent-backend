import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Review, Prisma } from '@prisma/client';

@Injectable()
export class ReviewsRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.ReviewCreateInput): Promise<Review> {
    return this.prisma.review.create({ data });
  }

  async findAll(includeProduct = false): Promise<Review[]> {
    return this.prisma.review.findMany({
      include: { product: includeProduct },
    });
  }

  async findUnique(id: number, includeProduct = false): Promise<Review | null> {
    return this.prisma.review.findUnique({
      where: { id },
      include: { product: includeProduct },
    });
  }

  async update(id: number, data: Prisma.ReviewUpdateInput): Promise<Review> {
    return this.prisma.review.update({
      where: { id },
      data,
    });
  }

  async delete(id: number): Promise<Review> {
    return this.prisma.review.delete({ where: { id } });
  }

  async findById(id: number): Promise<Review | null> {
    return this.prisma.review.findUnique({ where: { id } });
  }

  async findByProductId(productId: number): Promise<Review[]> {
    return this.prisma.review.findMany({
      where: { productId },
    });
  }

  async updateProductRating(productId: number): Promise<void> {
    const result = await this.prisma.review.aggregate({
      where: { productId },
      _avg: { rating: true },
    });
    await this.prisma.product.update({
      where: { id: productId },
      data: { rating: result._avg.rating ?? 0 },
    });
  }
}
