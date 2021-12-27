/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { TableColumnMerged } from '../composables/useColumns'
import type { TableColumnSelectableOption } from '../types'
import type { ComputedRef, VNodeTypes } from 'vue'

import { computed, defineComponent, inject } from 'vue'

import { convertCssPixel } from '@idux/cdk/utils'

import { TABLE_TOKEN } from '../token'

export default defineComponent({
  props: { ixFixedHolder: Boolean },
  setup(props) {
    const {
      flattedColumns,
      flattedColumnsWithScrollBar,
      columnWidths,
      columnWidthsWithScrollBar,
      mergedSelectableOptions,
      mergedPrefixCls,
    } = inject(TABLE_TOKEN)!
    const isRender = computed(() => flattedColumns.value.some(column => !!column.width || 'type' in column))
    return () => {
      const { ixFixedHolder } = props

      let children: VNodeTypes[] | undefined
      if (ixFixedHolder) {
        const widths = columnWidthsWithScrollBar.value
        children = flattedColumnsWithScrollBar.value.map((column, colIndex) =>
          renderCol(mergedPrefixCls, mergedSelectableOptions, column as TableColumnMerged, widths[colIndex]),
        )
      } else if (isRender.value) {
        const widths = columnWidths.value
        children = flattedColumns.value.map((column, colIndex) =>
          renderCol(mergedPrefixCls, mergedSelectableOptions, column, widths[colIndex]),
        )
      }
      return <colgroup>{children}</colgroup>
    }
  },
})

function renderCol(
  mergedPrefixCls: ComputedRef<string>,
  mergedSelectableOptions: ComputedRef<TableColumnSelectableOption[] | undefined>,
  column: TableColumnMerged,
  width?: number,
) {
  const prefixCls = mergedPrefixCls.value
  const type = 'type' in column && column.type

  const classess = {
    [`${prefixCls}-col-${type}`]: !!type,
    [`${prefixCls}-selectable-with-options`]: type === 'selectable' && mergedSelectableOptions.value,
  }

  const mergedWidth = width ?? column.width
  const style = mergedWidth ? { width: convertCssPixel(mergedWidth) } : undefined
  return <col key={column.key} class={classess} style={style}></col>
}
