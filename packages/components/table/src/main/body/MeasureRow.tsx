/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { TableColumnMerged } from '../../composables/useColumns'

import { type PropType, defineComponent, inject } from 'vue'

import MeasureCell from './MeasureCell'
import { TABLE_TOKEN, tableBodyToken } from '../../token'

export default defineComponent({
  props: { columns: Array as PropType<TableColumnMerged[]> },
  setup(props) {
    const { mergedPrefixCls } = inject(TABLE_TOKEN)!
    const { changeColumnWidth } = inject(tableBodyToken)!
    return () => {
      const children = props.columns?.map(column => {
        const { key } = column
        const cellProps = { key, cellKey: key, changeColumnWidth }
        return <MeasureCell {...cellProps}></MeasureCell>
      })
      return (
        <tr class={`${mergedPrefixCls.value}-measure-row`} style={{ fontSize: 0, height: 0 }} aria-hidden={true}>
          {children}
        </tr>
      )
    }
  },
})
