import { IsOptional, IsInt, Min } from 'class-validator'
import { Type, Transform } from 'class-transformer'

export class CursorPaginationRequestDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  cursor?: number

  @IsOptional()
  @Type(() => Number)
  @Transform(({ value }) => (value ? Number(value) : 10))
  @IsInt()
  @Min(1)
  limit?: number
}