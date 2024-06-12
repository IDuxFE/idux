/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { MergedData } from '../composables/useDataSource'
import type { TablePagination } from '../types'
import type { Slots, VNodeChild } from 'vue'

import { kebabCase } from 'lodash-es'

import { IxPagination } from '@idux/components/pagination'

export function renderPagination(
  slots: Slots,
  mergedPagination: TablePagination | null,
  filteredData: MergedData[],
  visible: boolean,
  prefixCls: string,
): [VNodeChild | null, VNodeChild | null] {
  let top: VNodeChild | null = null
  let bottom: VNodeChild | null = null

  if (mergedPagination !== null) {
    const { position } = mergedPagination
    const [vertical, horizontal] = kebabCase(position).split('-')
    const className = `${prefixCls}-pagination ${prefixCls}-pagination-${horizontal}`

    const node = slots.pagination?.({ total: filteredData.length, ...mergedPagination }) ?? (
      <IxPagination v-show={visible} class={className} total={filteredData.length} {...mergedPagination} />
    )

    top = vertical === 'top' ? node : null
    bottom = vertical === 'bottom' ? node : null
  }

  return [top, bottom]
}
