/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { TableColumnMergedExtra } from '../../composables/useColumns'
import type { VNodeChild } from 'vue'

import HeaderRow from './HeadRow'

export function renderHeaderRow(
  columns: TableColumnMergedExtra[],
  index: number,
  headerCells?: VNodeChild,
): VNodeChild {
  return (
    <HeaderRow columns={columns} key={index}>
      {headerCells}
    </HeaderRow>
  )
}
