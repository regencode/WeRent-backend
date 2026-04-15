export class CursorPaginationMetaDto {
  limit: number
  nextCursor: number | null
  hasNextPage: boolean

  constructor(limit: number, nextCursor: number | null) {
    this.limit = limit
    this.nextCursor = nextCursor
    this.hasNextPage = nextCursor !== null
  }
}

export class CursorPaginationResponseDto<T> {
  success: boolean
  data: T[]
  pagination: CursorPaginationMetaDto

  constructor(data: T[], pagination: CursorPaginationMetaDto) {
    this.success = true
    this.data = data
    this.pagination = pagination
  }
}

export function buildCursorPaginationResponse<T extends { id: number }>(
  items: T[],
  limit: number,
) {
  let nextCursor: number | null = null

  if (items.length > limit) {
    const nextItem = items.pop()
    nextCursor = nextItem?.id ?? null
  }

  return new CursorPaginationResponseDto(
    items,
    new CursorPaginationMetaDto(limit, nextCursor),
  )
}