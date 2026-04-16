import { Injectable, NotFoundException } from '@nestjs/common';
import { ReviewsRepository } from './reviews.repository';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { Review } from '@prisma/client';

@Injectable()
export class ReviewsService {
  constructor(
    private reviewsRepository: ReviewsRepository,
  ) {}

  async findReviewsOfProduct(productId: number | string) {
      return this.reviewsRepository.findByProductId(parseInt(productId as string));
  }

  async createReviewForProduct(dto: CreateReviewDto) {
      return this.reviewsRepository.create(dto);
  }

  async upvoteReviewWithId(id: number | string) {
      return this.reviewsRepository.upvoteReviewWithId(parseInt(id as string));
  }

  async remove(id: number) {
      this.reviewsRepository.remove(id);
  }
}
