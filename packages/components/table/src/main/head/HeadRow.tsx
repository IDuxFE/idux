import type { TableColumnBaseMerged, TableColumnExpandableMerged } from '../../composables/useColumns'

import { defineComponent, inject } from 'vue'
import { tableToken } from '../../token'
import { tableHeadRowProps } from '../../types'
import HeadCol from './HeadCol'
import HeadColExpand from './HeadColExpand'

export default defineComponent({
  props: tableHeadRowProps,
  setup(props) {
    const { headRowTag } = inject(tableToken)!

    return () => {
      const children = props.cols
        .filter(column => column.titleColSpan !== 0 && (column as TableColumnBaseMerged).titleRowSpan !== 0)
        .map((column, index) => {
          if ('type' in column) {
            if (column.type === 'expandable') {
              return renderExpandCol(column)
            }
            return null
          }
          return renderCol(column, index)
        })

      const HeadRowTag = headRowTag.value as any
      return <HeadRowTag class="ix-table-tr">{children}</HeadRowTag>
    }
  },
})

function renderCol(column: TableColumnBaseMerged, index: number) {
  const {
    titleColSpan: colSpan,
    titleRowSpan: rowSpan,
    additional,
    align,
    colStart,
    colEnd,
    ellipsis,
    title,
    customTitle,
    key = index,
  } = column
  const colProps = { colSpan, rowSpan, additional, align, colStart, colEnd, ellipsis, title, customTitle, key, index }
  return <HeadCol {...colProps}></HeadCol>
}

function renderExpandCol(column: TableColumnExpandableMerged) {
  const { additional } = column
  return <HeadColExpand additional={additional}></HeadColExpand>
}
