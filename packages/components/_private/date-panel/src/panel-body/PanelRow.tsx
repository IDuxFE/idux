/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { computed, defineComponent, inject } from 'vue'

import { datePanelToken } from '../token'
import { panelRowProps } from '../types'
import PanelCell from './PanelCell'

interface TbodyCell {
  key: string
  rowIndex: number
  cellIndex: number
  isWeek?: boolean
}

export default defineComponent({
  props: panelRowProps,
  setup(props) {
    const { mergedPrefixCls, activeType, maxCellIndex } = inject(datePanelToken)!

    const cells = computed(() => {
      const { rowIndex } = props
      const currType = activeType.value
      const isWeek = currType === 'week'
      const cells: TbodyCell[] = isWeek ? [{ key: `${currType}-${-1}`, rowIndex, cellIndex: 0, isWeek }] : []
      const maxIndex = maxCellIndex.value
      for (let cellIndex = 0; cellIndex < maxIndex; cellIndex++) {
        cells.push({ key: `${currType}-${cellIndex}`, rowIndex, cellIndex })
      }
      return cells
    })

    return () => {
      const children = cells.value.map(cell => <PanelCell {...cell} />)
      return (
        <tr role="row" class={`${mergedPrefixCls.value}-row`}>
          {children}
        </tr>
      )
    }
  },
})
