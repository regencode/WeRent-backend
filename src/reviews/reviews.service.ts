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

  async findReviewsOfProduct(productId: number) {
      return this.reviewsRepository.findByProductId(productId);
  }

  async createReviewForProduct(dto: CreateReviewDto) {
      return this.reviewsRepository.create(dto);
  }

  async upvoteReviewWithId(id: number) {
      return this.reviewsRepository.upvoteReviewWithId(id);
  }

  async remove(id: number) {
      this.reviewsRepository.remove(id);
  }
}
