/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { computed, defineComponent, inject } from 'vue'

import PanelCell from './PanelCell'
import { datePanelToken } from '../token'
import { panelRowProps } from '../types'

interface TbodyCell {
  key: string
  rowIndex: number
  cellIndex: number
}

export default defineComponent({
  props: panelRowProps,
  setup(props) {
    const { mergedPrefixCls, activeType, maxCellIndex } = inject(datePanelToken)!

    const cells = computed(() => {
      const { rowIndex } = props
      const currType = activeType.value
      const cells: TbodyCell[] = []
      const maxIndex = maxCellIndex.value
      for (let cellIndex = 0; cellIndex < maxIndex; cellIndex++) {
        cells.push({ key: `${currType}-${cellIndex}`, rowIndex: rowIndex!, cellIndex })
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
