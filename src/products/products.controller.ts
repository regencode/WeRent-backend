import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { ReviewsService } from '@/reviews/reviews.service';
import { CreateProductDto } from './dto/create-product.dto';
import { CreateReviewDto } from '@/reviews/dto/create-review.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService,
              private readonly reviewsService: ReviewsService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  findAll() {
      // TODO: pagination (extra mile)
    return this.productsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') productId: number) {
    return this.productsService.findOne(+productId);
  }

  @Delete(':id')
  removeProduct(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }

  @Get(':id/reviews')
  findAllReviewsOfProduct(@Param('id') productId: number) {
      // TODO: pagination (user story)
    return this.reviewsService.findReviewsOfProduct(productId);
  }

  @Post(':id/reviews')
  createReviewForProduct(@Param('id') productId: number, @Body() dto: CreateReviewDto) {
    dto.productId = productId;
    return this.reviewsService.createReviewForProduct(dto);
  }

  @Patch(':id/reviews/:reviewId/upvote')
  upvoteReviewOfProduct(@Param('reviewId') reviewId: number) {
    return this.reviewsService.upvoteReviewWithId(reviewId);
  }

  @Delete(':id/reviews/:reviewId')
  removeReview(@Param('reviewId') reviewId: number) {
      this.reviewsService.remove(reviewId);
  }

}
