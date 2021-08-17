import type { VNode } from 'vue'
import type { TablePagination } from '../types'

import { kebabCase } from 'lodash'
import { IxPagination } from '@idux/components/pagination'

export function renderPagination(
  mergedPagination: TablePagination | null,
  filteredData: unknown[],
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
