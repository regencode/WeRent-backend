import { Injectable, NotFoundException } from '@nestjs/common'
import { ProductsRepository } from './products.repository'
import { CreateProductDto } from './dto/create-product.dto'
import { Product } from '@prisma/client'
import { CursorPaginationService } from '@/common/services/pagination.service'
import { CursorPaginationRequestDto } from '@/common/dto/request/pagination.request.dto'

@Injectable()
export class ProductsService {
  constructor(
    private readonly productsRepository: ProductsRepository,
    private readonly paginationService: CursorPaginationService,
  ) {}

  async create(dto: CreateProductDto): Promise<Product> {
    return this.productsRepository.create({
      name: dto.name,
      brand: dto.brand,
      description: dto.description,
      price: dto.price,
      imageUrls: dto.imageUrls,
    })
  }

  async findAll(paginationDto: CursorPaginationRequestDto) {
    return this.paginationService.paginate<Product>(
      this.productsRepository,
      paginationDto,
      {
        cursorField: 'id',
        orderDirection: 'asc',
      },
    )
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.productsRepository.findUnique(id, true)

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`)
    }

    return product
  }

  async remove(id: number): Promise<void> {
    const product = await this.productsRepository.findById(id)

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`)
    }

    await this.productsRepository.delete(id)
  }
}