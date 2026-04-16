import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { ProductsRepository } from './products.repository';
import { ReviewsModule } from '@/reviews/reviews.module';
import { CursorPaginationService } from '@/common/services/pagination.service';

@Module({
  imports: [ReviewsModule],
  controllers: [ProductsController],
  providers: [ProductsService, ProductsRepository, CursorPaginationService],
  exports: [ProductsService, ProductsRepository],

})
export class ProductsModule {}
