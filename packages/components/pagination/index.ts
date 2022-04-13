/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { PaginationComponent } from './src/types'

import Pagination from './src/Pagination'

const IxPagination = Pagination as unknown as PaginationComponent

export { IxPagination }

export type {
  PaginationInstance,
  PaginationComponent,
  PaginationPublicProps as PaginationProps,
  PaginationSize,
  PaginationItemType,
  PaginationItemRenderOptions,
} from './src/types'
