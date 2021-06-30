import type { PaginationComponent } from './src/types'

import Pagination from './src/Pagination'

const IxPagination = Pagination as unknown as PaginationComponent

export { IxPagination }

export type {
  PaginationInstance,
  PaginationProps,
  PaginationSize,
  PaginationItemType,
  PaginationItemRenderOptions,
  PaginationItemRenderFn,
  PaginationTotalRenderFn,
} from './src/types'
