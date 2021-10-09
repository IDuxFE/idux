/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { MergedData } from '../composables/useDataSource'
import type { TablePagination } from '../types'
import type { VNode } from 'vue'

import { kebabCase } from 'lodash-es'

import { IxPagination } from '@idux/components/pagination'

export function renderPagination(
  mergedPagination: TablePagination | null,
  filteredData: MergedData[],
): [VNode | null, VNode | null] {
  let top: VNode | null = null
  let bottom: VNode | null = null

  if (mergedPagination !== null) {
    const { position } = mergedPagination
    const [vertical, horizontal] = kebabCase(position).split('-')
    const className = `ix-table-pagination ix-table-pagination-${horizontal}`

    const node = <IxPagination class={className} total={filteredData.length} {...mergedPagination} />

    top = vertical === 'top' ? node : null
    bottom = vertical === 'bottom' ? node : null
  }

  return [top, bottom]
}
