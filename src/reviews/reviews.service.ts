import { Injectable, NotFoundException } from '@nestjs/common';
import { ReviewsRepository } from './reviews.repository';
import { ProductsRepository } from '../products/products.repository';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { Review } from '@prisma/client';

@Injectable()
export class ReviewsService {
  constructor(
    private reviewsRepository: ReviewsRepository,
    private productsRepository: ProductsRepository,
  ) {}

  async create(dto: CreateReviewDto): Promise<Review> {
    const product = await this.productsRepository.findById(dto.productId);
    if (!product) {
      throw new NotFoundException(`Product with ID ${dto.productId} not found`);
    }

    const review = await this.reviewsRepository.create({
      product: { connect: { id: dto.productId } },
      rating: dto.rating,
      description: dto.description,
      attachmentUrl: dto.attachmentUrl,
    });

    await this.reviewsRepository.updateProductRating(dto.productId);

    return review;
  }

  async findAll(): Promise<Review[]> {
    return this.reviewsRepository.findAll(true);
  }

  async findOne(id: number): Promise<Review> {
    const review = await this.reviewsRepository.findUnique(id, true);
    if (!review) {
      throw new NotFoundException(`Review with ID ${id} not found`);
    }
    return review;
  }

  async update(id: number, dto: UpdateReviewDto): Promise<Review> {
    const review = await this.reviewsRepository.findById(id);
    if (!review) {
      throw new NotFoundException(`Review with ID ${id} not found`);
    }

    const updatedReview = await this.reviewsRepository.update(id, {
      rating: dto.rating ?? undefined,
      description: dto.description ?? undefined,
      attachmentUrl: dto.attachmentUrl ?? undefined,
    });

    await this.reviewsRepository.updateProductRating(review.productId);

    return updatedReview;
  }

  async remove(id: number): Promise<void> {
    const review = await this.reviewsRepository.findById(id);
    if (!review) {
      throw new NotFoundException(`Review with ID ${id} not found`);
    }
    const productId = review.productId;
    await this.reviewsRepository.delete(id);
    await this.reviewsRepository.updateProductRating(productId);
  }
}
