import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
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

  // ✅ Tambah pagination (tanpa ubah flow besar)
  @Get()
  findAll(@Query() paginationDto: CursorPaginationRequestDto) {
    return this.productsService.findAll(paginationDto)
  }

  @Get(':id')
  findOne(@Param('id') productId: string) {
    return this.productsService.findOne(Number(productId))
  }

  @Delete(':id')
  removeProduct(@Param('id') id: string) {
    return this.productsService.remove(Number(id))
  }

  // ❌ belum kita ubah (sesuai request kamu fokus product dulu)
  @Get(':id/reviews')
  findAllReviewsOfProduct(@Param('id') productId: number) {
    return this.reviewsService.findReviewsOfProduct(productId)
  }

  @Post(':id/reviews')
  createReviewForProduct(
    @Param('id') productId: number,
    @Body() dto: CreateReviewDto,
  ) {
    dto.productId = productId
    return this.reviewsService.createReviewForProduct(dto)
  }

  @Patch(':id/reviews/:reviewId/upvote')
  upvoteReviewOfProduct(@Param('reviewId') reviewId: number) {
    return this.reviewsService.upvoteReviewWithId(reviewId)
  }

  @Delete(':id/reviews/:reviewId')
  removeReview(@Param('reviewId') reviewId: number) {
    this.reviewsService.remove(reviewId)
  }
}