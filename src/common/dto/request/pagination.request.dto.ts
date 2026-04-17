import { IsOptional, IsInt, Min } from 'class-validator'
import { Transform, Type } from 'class-transformer'

export class CursorPaginationRequestDto {
  @IsOptional()
  @Type(() => Number)
  @Transform(({ value }) =>
    value !== undefined ? Number(value) : undefined,
  )
  @IsInt()
  cursor?: number

  @IsOptional()
  @Type(() => Number)
  @Transform(({ value }) =>
    value !== undefined ? Number(value) : 10,
  )
  @IsInt()
  @Min(1)
  limit?: number
}