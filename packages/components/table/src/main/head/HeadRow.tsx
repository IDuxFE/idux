import type { ComputedRef, StyleValue } from 'vue'
import type { TableColumnMergedBaseExtra } from '../../composables/useColumns'
import type { Key, TableHeadRowProps } from '../../types'

import { computed, defineComponent, inject } from 'vue'
import { convertCssPixel } from '@idux/cdk/utils'
import { tableToken } from '../../token'
import { tableHeadRowProps } from '../../types'
import HeadCell from './HeadCell'

export default defineComponent({
  props: tableHeadRowProps,
  setup(props) {
    const { fixedColumnKeys, columnOffsetsWithScrollBar, isSticky, headRowTag } = inject(tableToken)!
    const rowColumns = useBodyColumns(props, fixedColumnKeys, columnOffsetsWithScrollBar, isSticky)
    return () => {
      const children = rowColumns.value.map(column => <HeadCell {...column}></HeadCell>)
      const HeadRowTag = headRowTag.value as any
      return <HeadRowTag>{children}</HeadRowTag>
    }
  },
})

function useBodyColumns(
  props: TableHeadRowProps,
  fixedColumnKeys: ComputedRef<{
    lastStartKey: Key | undefined
    firstEndKey: Key | undefined
  }>,
  columnOffsetsWithScrollBar: ComputedRef<{
    starts: number[]
    ends: number[]
  }>,
  isSticky: ComputedRef<boolean>,
) {
  return computed(() =>
    props.columns
      .filter(column => column.titleColSpan !== 0 && (column as TableColumnMergedBaseExtra).titleRowSpan !== 0)
      .map(column => {
        const {
          key,
          fixed,
          align,
          ellipsis,
          additional,
          titleColSpan,
          titleRowSpan,
          colStart,
          colEnd,
          hasChildren,
          title,
          customTitle,
          type,
        } = column
        const colSpan = titleColSpan === 1 ? undefined : titleColSpan
        const rowSpan = titleRowSpan === 1 ? undefined : titleRowSpan

        const prefixCls = 'ix-table'
        let classes: Record<string, boolean | string | undefined> = {
          [`${prefixCls}-cell-${type}`]: type,
          [`${prefixCls}-align-${align}`]: !hasChildren && align,
          [`${prefixCls}-align-center`]: hasChildren,
        }
        let style: StyleValue | undefined
        if (fixed) {
          const { lastStartKey, firstEndKey } = fixedColumnKeys.value
          classes = {
            ...classes,
            [`${prefixCls}-fix-start`]: fixed === 'start',
            [`${prefixCls}-fix-start-last`]: lastStartKey === key,
            [`${prefixCls}-fix-end`]: fixed === 'end',
            [`${prefixCls}-fix-end-first`]: firstEndKey === key,
            [`${prefixCls}-fix-sticky`]: isSticky.value,
          }
          const { starts, ends } = columnOffsetsWithScrollBar.value
          const offsets = fixed === 'start' ? starts : ends
          const offsetIndex = fixed === 'start' ? colStart : colEnd
          const fixedOffset = convertCssPixel(offsets[offsetIndex])
          style = {
            position: 'sticky',
            left: fixed === 'start' ? fixedOffset : undefined,
            right: fixed === 'end' ? fixedOffset : undefined,
          }
        }
        return { key, class: classes, style, colSpan, rowSpan, additional, ellipsis, title, customTitle, type }
      }),
  )
}
