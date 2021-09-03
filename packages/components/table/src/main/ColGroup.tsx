import type { ComputedRef, VNodeTypes } from 'vue'
import type { TableColumnMerged } from '../composables/useColumns'
import type { TableColumnSelectableOption } from '../types'

import { computed, defineComponent, inject } from 'vue'
import { convertCssPixel } from '@idux/cdk/utils'
import { tableToken } from '../token'

export default defineComponent({
  props: { ixFixedHolder: Boolean },
  setup(props) {
    const {
      flattedColumns,
      flattedColumnsWithScrollBar,
      columnWidths,
      columnWidthsWithScrollBar,
      mergedSelectableOptions,
    } = inject(tableToken)!
    const isRender = computed(() => flattedColumns.value.some(column => !!column.width || 'type' in column))
    return () => {
      const { ixFixedHolder } = props

      let children: VNodeTypes[] | undefined
      if (ixFixedHolder) {
        const widths = columnWidthsWithScrollBar.value
        children = flattedColumnsWithScrollBar.value.map((column, index) =>
          renderCol(mergedSelectableOptions, column as TableColumnMerged, widths[index]),
        )
      } else if (isRender.value) {
        const widths = columnWidths.value
        children = flattedColumns.value.map((column, index) =>
          renderCol(mergedSelectableOptions, column, widths[index]),
        )
      }
      return <colgroup>{children}</colgroup>
    }
  },
})

function renderCol(
  mergedSelectableOptions: ComputedRef<TableColumnSelectableOption[] | undefined>,
  column: TableColumnMerged,
  width?: number,
) {
  let className: string | undefined
  if ('type' in column) {
    const type = column.type
    className = `ix-table-col-${type}`
    if (type === 'selectable' && mergedSelectableOptions.value) {
      className += ' ix-table-selectable-with-options'
    }
  }
  const mergedWidth = width ?? column.width
  const style = mergedWidth ? { width: convertCssPixel(mergedWidth) } : undefined
  return <col key={column.key} class={className} style={style}></col>
}
