import type { Slots, StyleValue, VNodeTypes } from 'vue'
import type { TableColumnMergedExtra } from '../../composables/useColumns'
import type { TableColumnTitleFn } from '../../types'

import { computed, defineComponent, inject } from 'vue'
import { isFunction, isString } from 'lodash-es'
import { convertCssPixel } from '@idux/cdk/utils'
import { TABLE_TOKEN } from '../../token'
import { tableHeadCellProps } from '../../types'
import { getColTitle } from '../../utils'
import HeadCellSelectable from './HeadCellSelectable'
import HeadCellSortable from './HeadCellSortable'

type HeadColumn = TableColumnMergedExtra & {
  type: 'selectable' | 'expandable' | 'scroll-bar' | undefined
  titleRowSpan: number
}

export default defineComponent({
  props: tableHeadCellProps,
  setup(props) {
    const { slots, fixedColumnKeys, columnOffsetsWithScrollBar, isSticky, activeSortable, handleSort, headColTag } =
      inject(TABLE_TOKEN)!
    const key = computed(() => props.column.key)
    const isSorted = computed(() => activeSortable.key === key.value && !!activeSortable.orderBy)
    const activeSortOrderBy = computed(() => (isSorted.value ? activeSortable.orderBy : undefined))
    const onClick = () => {
      const { key, sortable } = props.column
      if (sortable) {
        handleSort(key, sortable)
      }
    }

    const cellProps = computed(() => {
      const { type, align, hasChildren, fixed, key, colStart, colEnd, sortable, titleColSpan, titleRowSpan } =
        props.column as HeadColumn

      const prefixCls = 'ix-table'
      let classes: Record<string, boolean | undefined> = {
        [`${prefixCls}-cell-${type}`]: !!type,
        [`${prefixCls}-cell-sortable`]: !!sortable,
        [`${prefixCls}-cell-sorted`]: isSorted.value,
        [`${prefixCls}-align-${align}`]: !hasChildren && !!align,
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
      return {
        class: classes,
        style,
        colSpan: titleColSpan === 1 ? undefined : titleColSpan,
        rowSpan: titleRowSpan === 1 ? undefined : titleRowSpan,
      }
    })

    return () => {
      const { type, additional } = props.column as HeadColumn
      let _title: string | undefined
      let children: VNodeTypes | undefined
      if (type === 'expandable' || type === 'scroll-bar') {
        children = undefined
      } else if (type === 'selectable') {
        children = <HeadCellSelectable></HeadCellSelectable>
      } else {
        const { title, customTitle, ellipsis, sortable } = props.column as HeadColumn
        children = renderChildren(title, customTitle, slots)
        _title = getColTitle(ellipsis, children!, title)
        if (ellipsis || sortable) {
          children = <span class="ix-table-cell-title">{children}</span>
          if (sortable) {
            children = (
              <HeadCellSortable activeOrderBy={activeSortOrderBy.value} sortable={sortable}>
                {children}
              </HeadCellSortable>
            )
          }
        }
      }

      const HeadColTag = headColTag.value as any
      return (
        <HeadColTag {...cellProps.value} title={_title} {...additional} onClick={onClick}>
          {children}
        </HeadColTag>
      )
    }
  },
})

function renderChildren(title: string | undefined, customTitle: string | TableColumnTitleFn | undefined, slots: Slots) {
  let children: VNodeTypes | undefined = title
  if (isFunction(customTitle)) {
    children = customTitle({ title })
  } else if (isString(customTitle) && slots[customTitle]) {
    children = slots[customTitle]!({ title })
  }
  return children
}
