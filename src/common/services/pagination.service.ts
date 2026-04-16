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

    const safeLimit = limit ?? 10
    const cursorField = options?.cursorField || 'id'

    // ✅ selalu konsisten dengan cursor
    const orderBy = options?.defaultSort || { [cursorField]: 'asc' }

    const prismaCursor =
      cursor != null ? { [cursorField]: cursor } : undefined

    const items: T[] = await model.findMany({
      ...args,
      take: safeLimit + 1,
      cursor: prismaCursor,
      skip: cursor ? 1 : 0,
      orderBy,
    })

    let nextCursor: any = null

    if (items.length > safeLimit) {
      const nextItem = items.pop()
      nextCursor = nextItem?.[cursorField] ?? null
    }

    return new CursorPaginationResponseDto(
      items,
      new CursorPaginationMetaDto(safeLimit, nextCursor),
    )
  }
}