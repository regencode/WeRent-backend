import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
} from '@nestjs/common'
import { ProductsService } from './products.service'
import { ReviewsService } from '@/reviews/reviews.service'
import { CreateProductDto } from './dto/create-product.dto'
import { CreateReviewDto } from '@/reviews/dto/create-review.dto'
import { CursorPaginationRequestDto } from '@/common/dto/request/pagination.request.dto'

@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly reviewsService: ReviewsService,
  ) {}

  @Post()
  create(@Body() dto: CreateProductDto) {
    return this.productsService.create(dto)
  }

  /**
   * ✅ Cursor pagination for products
   */
  @Get()
  findAll(@Query() paginationDto: CursorPaginationRequestDto) {
    return this.productsService.findAll(paginationDto)
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) productId: number) {
    return this.productsService.findOne(productId)
  }

  @Delete(':id')
  removeProduct(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.remove(id)
  }

  /**
   * ✅ Cursor pagination for reviews (nested)
   */
  @Get(':id/reviews')
  findAllReviewsOfProduct(
    @Param('id', ParseIntPipe) productId: number,
    @Query() paginationDto: CursorPaginationRequestDto,
  ) {
    return this.reviewsService.findReviewsOfProduct(
      productId,
      paginationDto,
    )
  }

  @Post(':id/reviews')
  createReviewForProduct(
    @Param('id', ParseIntPipe) productId: number,
    @Body() dto: CreateReviewDto,
  ) {
    dto.productId = productId
    return this.reviewsService.createReviewForProduct(dto)
  }

  @Patch(':id/reviews/:reviewId/upvote')
  upvoteReviewOfProduct(
    @Param('reviewId', ParseIntPipe) reviewId: number,
  ) {
    return this.reviewsService.upvoteReviewWithId(reviewId)
  }

  @Delete(':id/reviews/:reviewId')
  removeReview(
    @Param('reviewId', ParseIntPipe) reviewId: number,
  ) {
    return this.reviewsService.remove(reviewId)
  }
}