import { IsOptional, IsInt, Min, Max } from 'class-validator'
import { Type } from 'class-transformer'

export class CursorPaginationRequestDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'Cursor harus berupa angka' })
  cursor?: number

  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'Limit harus berupa angka' })
  @Min(1, { message: 'Limit minimal 1' })
  @Max(100, { message: 'Limit maksimal 100' })
  limit: number = 5

  @IsOptional()
  sortBy: string = '-createdAt'

  parseSortBy(): Record<string, 'asc' | 'desc'> {
    if (!this.sortBy) return { id: 'asc' }

    const isDesc = this.sortBy.startsWith('-')
    const field = isDesc ? this.sortBy.slice(1) : this.sortBy

    return {
      [field]: isDesc ? 'desc' : 'asc',
    }
  }
}