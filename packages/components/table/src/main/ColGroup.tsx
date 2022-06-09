/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { type ComputedRef, type VNodeTypes, computed, defineComponent, inject, normalizeClass } from 'vue'

import { convertCssPixel } from '@idux/cdk/utils'
import { type MenuData } from '@idux/components/menu'

import { type TableColumnMerged } from '../composables/useColumns'
import { TABLE_TOKEN } from '../token'

export default defineComponent({
  props: { isFixedHolder: Boolean },
  setup(props) {
    const {
      flattedColumns,
      flattedColumnsWithScrollBar,
      columnWidths,
      columnWidthsWithScrollBar,
      mergedSelectableMenus,
      mergedPrefixCls,
    } = inject(TABLE_TOKEN)!
    const isRender = computed(() => flattedColumns.value.some(column => !!column.width || 'type' in column))
    return () => {
      const { isFixedHolder } = props

      let children: VNodeTypes[] | undefined
      if (isFixedHolder) {
        const widths = columnWidthsWithScrollBar.value
        children = flattedColumnsWithScrollBar.value.map((column, colIndex) =>
          renderCol(mergedPrefixCls, mergedSelectableMenus, column as TableColumnMerged, widths[colIndex]),
        )
      } else if (isRender.value) {
        const widths = columnWidths.value
        children = flattedColumns.value.map((column, colIndex) =>
          renderCol(mergedPrefixCls, mergedSelectableMenus, column, widths[colIndex]),
        )
      }
      return <colgroup>{children}</colgroup>
    }
  },
})

function renderCol(
  mergedPrefixCls: ComputedRef<string>,
  mergedSelectableMenus: ComputedRef<MenuData[]>,
  column: TableColumnMerged,
  width?: number,
) {
  const prefixCls = mergedPrefixCls.value
  const type = 'type' in column && column.type

  const className = normalizeClass({
    [`${prefixCls}-col-${type}`]: !!type,
    [`${prefixCls}-selectable-with-dropdown`]: type === 'selectable' && mergedSelectableMenus.value.length > 0,
  })

  const mergedWidth = column.width ?? width
  const style = mergedWidth ? { width: convertCssPixel(mergedWidth) } : undefined
  return <col key={column.key} class={className} style={style}></col>
}
