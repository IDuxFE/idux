/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { TableColumnMergedExtra } from '../../composables/useColumns'
import type { TableColumnFilterable, TableColumnSortable, TableColumnTitleFn } from '../../types'
import type { Slots, StyleValue, VNodeTypes } from 'vue'

import { computed, defineComponent, inject } from 'vue'

import { isFunction, isString } from 'lodash-es'

import { convertCssPixel } from '@idux/cdk/utils'

import { TABLE_TOKEN } from '../../token'
import { tableHeadCellProps } from '../../types'
import { getColTitle } from '../../utils'
import HeadCellFilterableTrigger from '../head-trigger/HeadCellFilterableTrigger'
import HeadCellSortableTrigger from '../head-trigger/HeadCellSortableTrigger'
import HeadCellSelectable from './HeadCellSelectable'

type HeadColumn = TableColumnMergedExtra & {
  type: 'selectable' | 'expandable' | 'scroll-bar' | undefined
  titleRowSpan: number
}

export default defineComponent({
  props: tableHeadCellProps,
  setup(props) {
    const {
      mergedPrefixCls,
      slots,
      fixedColumnKeys,
      columnOffsetsWithScrollBar,
      isSticky,
      handleSort,
      headColTag,
      activeSortable,
      filterables,
    } = inject(TABLE_TOKEN)!

    const onClick = () => {
      const { key, sortable } = props.column
      if (sortable) {
        handleSort(key, sortable)
      }
    }

    const cellProps = computed(() => {
      const { type, align, hasChildren, fixed, key, colStart, colEnd, sortable, titleColSpan, titleRowSpan } =
        props.column as HeadColumn

      const prefixCls = mergedPrefixCls.value
      let classes: Record<string, boolean | undefined> = {
        [`${prefixCls}-cell-${type}`]: !!type,
        [`${prefixCls}-cell-sortable`]: !!sortable,
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

    const sortable = computed(() => props.column.sortable)
    const activeSortOrderBy = computed(() =>
      activeSortable.key === props.column.key && !!activeSortable.orderBy ? activeSortable.orderBy : undefined,
    )
    const filterable = computed(() => filterables.value.find(f => f.key === props.column.key))

    return () => {
      const { type, additional } = props.column as HeadColumn
      const prefixCls = mergedPrefixCls.value

      let _title: string | undefined
      let children: VNodeTypes | undefined
      let iconTriggers: (VNodeTypes | null)[] | undefined
      if (type === 'scroll-bar') {
        children = undefined
      } else if (type === 'selectable') {
        children = <HeadCellSelectable></HeadCellSelectable>
      } else {
        const { title, customTitle, ellipsis } = props.column as HeadColumn
        children = renderChildren(title, customTitle, slots)
        _title = getColTitle(ellipsis, children!, title)

        iconTriggers = [
          renderSortableTrigger(sortable.value, activeSortOrderBy.value),
          renderFilterableTrigger(filterable.value),
        ]

        if (ellipsis || iconTriggers.some(trigger => !!trigger)) {
          children = <span class={`${prefixCls}-cell-title`}>{children}</span>
        }
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const HeadColTag = headColTag.value as any
      return (
        <HeadColTag {...cellProps.value} title={_title} {...additional} onClick={onClick}>
          <span class={`${prefixCls}-head-cell-wrapper`}>
            {children}
            <span class={`${prefixCls}-head-icon-triggers`}>{iconTriggers}</span>
          </span>
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

function renderSortableTrigger(
  sortable: TableColumnSortable | undefined,
  activeSortOrderBy: 'descend' | 'ascend' | undefined,
): VNodeTypes | null {
  if (!sortable) {
    return null
  }

  return <HeadCellSortableTrigger activeOrderBy={activeSortOrderBy} sortable={sortable} />
}

function renderFilterableTrigger(filterable: TableColumnFilterable | undefined): VNodeTypes | null {
  if (!filterable) {
    return null
  }

  return <HeadCellFilterableTrigger filterable={filterable} />
}
