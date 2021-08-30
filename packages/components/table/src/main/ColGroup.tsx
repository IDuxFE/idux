import type { VNodeTypes } from 'vue'
import type { TableColumnMerged } from '../composables/useColumns'

import { convertCssPixel } from '@idux/cdk/utils'
import { defineComponent, inject } from 'vue'
import { tableToken } from '../token'

export default defineComponent({
  setup() {
    const { flattedColumns, columnWidths, scrollBarColumn } = inject(tableToken)!
    return () => {
      const columns = flattedColumns.value
      const widths = columnWidths.value

      let children: VNodeTypes[] | undefined

      if (widths.length) {
        children = widths.map((width, index) => renderCol(columns[index], width))
        if (children.length && scrollBarColumn.value) {
          children.push(renderCol(scrollBarColumn.value as TableColumnMerged))
        }
      } else {
        if (columns.some(column => !!column.width || 'type' in column)) {
          children = columns.map(column => renderCol(column))
        }
      }
      return <colgroup>{children}</colgroup>
    }
  },
})

function renderCol(column: TableColumnMerged, width?: number) {
  const className = 'type' in column ? `ix-table-col-${column.type}` : undefined
  const _width = width ?? column.width
  const style = _width ? { width: convertCssPixel(_width) } : undefined
  return <col key={column.key} class={className} style={style}></col>
}
