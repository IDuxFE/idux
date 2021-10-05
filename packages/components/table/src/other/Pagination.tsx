import type { VNode } from 'vue'
import type { TablePagination } from '../types'
import type { MergedData } from '../composables/useDataSource'

import { kebabCase } from 'lodash-es'
import { useGlobalConfig } from '@idux/components/config'
import { IxPagination } from '@idux/components/pagination'

export function renderPagination(
  mergedPagination: TablePagination | null,
  filteredData: MergedData[],
): [VNode | null, VNode | null] {
  const { prefixCls } = useGlobalConfig('common')

  let top: VNode | null = null
  let bottom: VNode | null = null

  if (mergedPagination !== null) {
    const { position } = mergedPagination
    const [vertical, horizontal] = kebabCase(position).split('-')
    const className = `${prefixCls}-table-pagination ${prefixCls}-table-pagination-${horizontal}`

    const node = <IxPagination class={className} total={filteredData.length} {...mergedPagination} />

    top = vertical === 'top' ? node : null
    bottom = vertical === 'bottom' ? node : null
  }

  return [top, bottom]
}
