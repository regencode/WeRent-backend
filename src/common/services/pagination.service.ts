import { Injectable } from '@nestjs/common'
import { CursorPaginationRequestDto } from '../dto/request/pagination.request.dto'
import {
  CursorPaginationResponseDto,
  CursorPaginationMetaDto,
} from '../dto/response/pagination.response.dto'

interface ICursorPaginationOptions {
  sortAllowedFields?: string[]
  defaultSort?: Record<string, 'asc' | 'desc'>
  cursorField?: string
}

@Injectable()
export class CursorPaginationService {
  async paginate<T extends Record<string, any>>(
    model: {
      findMany: Function
    },
    paginationDto: CursorPaginationRequestDto,
    args: any = {},
    options?: ICursorPaginationOptions,
  ): Promise<CursorPaginationResponseDto<T>> {
    const { cursor, limit } = paginationDto

    const cursorField = options?.cursorField || 'id'

    let orderBy: Record<string, 'asc' | 'desc'> = {}

    if (
      paginationDto.sortBy &&
      options?.sortAllowedFields?.includes(
        paginationDto.sortBy.startsWith('-')
          ? paginationDto.sortBy.slice(1)
          : paginationDto.sortBy,
      )
    ) {
      const isDesc = paginationDto.sortBy.startsWith('-')
      const field = isDesc
        ? paginationDto.sortBy.slice(1)
        : paginationDto.sortBy

      orderBy[field] = isDesc ? 'desc' : 'asc'
    } else {
      orderBy = options?.defaultSort || { [cursorField]: 'asc' }
    }

    const prismaCursor =
      cursor != null ? { [cursorField]: cursor } : undefined

    const items: T[] = await model.findMany({
      ...args,
      take: limit + 1,
      cursor: prismaCursor,
      skip: cursor ? 1 : 0,
      orderBy,
    })

    let nextCursor: any = null

    if (items.length > limit) {
      const nextItem = items.pop()
      nextCursor = nextItem?.[cursorField] ?? null
    }

    return new CursorPaginationResponseDto(
      items,
      new CursorPaginationMetaDto(limit, nextCursor),
    )
  }
}