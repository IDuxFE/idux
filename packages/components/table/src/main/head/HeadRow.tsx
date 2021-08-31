import type { TableColumnMergedBaseExtra } from '../../composables/useColumns'

import { defineComponent, inject } from 'vue'
import { tableToken } from '../../token'
import { tableHeadRowProps } from '../../types'
import HeadCol from './HeadCol'
import HeadColExpandable from './HeadColExpandable'
import HeadColSelectable from './HeadColSelectable'

export default defineComponent({
  props: tableHeadRowProps,
  setup(props) {
    const { headRowTag } = inject(tableToken)!
    return () => {
      const children = props.columns
        .filter(column => column.titleColSpan !== 0 && (column as TableColumnMergedBaseExtra).titleRowSpan !== 0)
        .map(column => {
          if ('type' in column) {
            if (column.type === 'expandable') {
              return <HeadColExpandable></HeadColExpandable>
            } else if (column.type === 'selectable') {
              return <HeadColSelectable></HeadColSelectable>
            } else if (column.type === 'scroll-bar') {
              return renderCol(column)
            }
            return null
          }
          return renderCol(column)
        })

      const HeadRowTag = headRowTag.value as any
      return <HeadRowTag>{children}</HeadRowTag>
    }
  },
})

function renderCol(column: TableColumnMergedBaseExtra) {
  const {
    titleColSpan: colSpan,
    titleRowSpan: rowSpan,
    additional,
    align,
    colStart,
    colEnd,
    ellipsis,
    fixed,
    hasChildren,
    title,
    customTitle,
    key,
  } = column
  const colProps = {
    colSpan,
    rowSpan,
    additional,
    align,
    colStart,
    colEnd,
    ellipsis,
    fixed,
    hasChildren,
    title,
    customTitle,
    key,
    cellKey: key,
  }
  return <HeadCol {...colProps}></HeadCol>
}
