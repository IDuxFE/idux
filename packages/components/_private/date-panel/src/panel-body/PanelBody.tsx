/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { DatePanelType } from '../types'
import type { DateConfig } from '@idux/components/config'
import type { ComputedRef, VNode } from 'vue'

import { computed, defineComponent, inject } from 'vue'

import { datePanelToken } from '../token'
import PanelRow from './PanelRow'

export default defineComponent({
  setup() {
    const { mergedPrefixCls, dateConfig, activeType, maxRowIndex, maxCellIndex } = inject(datePanelToken)!

    const theadCells = useTheadCells(dateConfig, activeType, maxCellIndex)

    return () => {
      const prefixCls = `${mergedPrefixCls.value}-body`

      const thNodes = theadCells.value.map(cell => {
        const { key, label } = cell
        return (
          <th role="columnheader" key={key}>
            {label}
          </th>
        )
      })

      const maxIndex = maxRowIndex.value
      const rows: VNode[] = []
      for (let rowIndex = 0; rowIndex < maxIndex; rowIndex++) {
        rows.push(<PanelRow key={rowIndex} rowIndex={rowIndex} />)
      }

      return (
        <div class={prefixCls}>
          <table role="grid">
            {thNodes.length > 0 && (
              <thead>
                <tr role="row">{thNodes}</tr>
              </thead>
            )}
            <tbody>{rows}</tbody>
          </table>
        </div>
      )
    }
  },
})

interface TheadCell {
  key: number
  label?: string
}

function useTheadCells(
  dateConfig: DateConfig,
  activeType: ComputedRef<DatePanelType>,
  maxCellIndex: ComputedRef<number>,
) {
  return computed(() => {
    const currType = activeType.value
    const isWeek = currType === 'week'
    const cols: TheadCell[] = isWeek ? [{ key: -1 }] : []
    if (currType === 'date' || isWeek) {
      const maxIndex = maxCellIndex.value
      const labels = dateConfig.getLocalizedLabels('day', maxIndex, 'narrow')
      const weekStarts = dateConfig.weekStartsOn()
      for (let colIndex = 0; colIndex < maxIndex; colIndex++) {
        cols.push({ key: colIndex, label: labels[(colIndex + weekStarts) % maxIndex] })
      }
    }
    return cols
  })
}
