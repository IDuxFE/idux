/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { ComputedRef, type Slots, type VNodeTypes, computed, defineComponent, inject } from 'vue'

import { isFunction, isString } from 'lodash-es'

import { Logger, type VKey, callEmit, convertCssPixel } from '@idux/cdk/utils'

import { type TableColumnMergedExtra } from '../../composables/useColumns'
import { TABLE_TOKEN } from '../../token'
import { type TableColumnFilterable, type TableColumnSortable, tableHeadCellProps } from '../../types'
import { getColTitle } from '../../utils'
import FilterableTrigger from './triggers/FilterableTrigger'
import SelectableTrigger from './triggers/SelectableTrigger'
import SortableTrigger from './triggers/SortableTrigger'

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
      filterByMap,
      setFilterBy,
    } = inject(TABLE_TOKEN)!

    const classes = computed(() => {
      const { type, align, hasChildren, fixed, key, sortable, filterable } = props.column as HeadColumn
      const prefixCls = mergedPrefixCls.value
      let classes: Record<string, boolean | undefined> = {
        [`${prefixCls}-cell-${type}`]: !!type,
        [`${prefixCls}-cell-sortable`]: !!sortable,
        [`${prefixCls}-cell-filterable`]: !!filterable,
        [`${prefixCls}-align-${align}`]: !hasChildren && !!align,
        [`${prefixCls}-align-center`]: hasChildren,
      }
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
      }
      return classes
    })

    const style = computed(() => {
      const { fixed, colStart, colEnd } = props.column as HeadColumn
      if (!fixed) {
        return
      }
      const { starts, ends } = columnOffsetsWithScrollBar.value
      const offsets = fixed === 'start' ? starts : ends
      const offsetIndex = fixed === 'start' ? colStart : colEnd
      const fixedOffset = convertCssPixel(offsets[offsetIndex])
      return {
        position: 'sticky',
        left: fixed === 'start' ? fixedOffset : undefined,
        right: fixed === 'end' ? fixedOffset : undefined,
      }
    })

    const activeSortOrderBy = computed(() =>
      activeSortable.key === props.column.key && !!activeSortable.orderBy ? activeSortable.orderBy : undefined,
    )
    const activeFilterBy = computed(() => filterByMap[props.column.key])
    const onUpdateFilterBy = (filterBy: VKey[]) => {
      const { key, filterable } = props.column
      setFilterBy(key, filterBy)
      callEmit(filterable?.onChange, filterBy)
    }

    const onClick = () => {
      const { key, sortable } = props.column
      if (sortable) {
        handleSort(key, sortable)
      }
    }

    return () => {
      const { type, additional, titleColSpan, titleRowSpan } = props.column as HeadColumn
      const prefixCls = mergedPrefixCls.value

      let _title: string | undefined
      let children: VNodeTypes | undefined

      if (type === 'scroll-bar') {
        children = undefined
      } else if (type === 'selectable') {
        children = <SelectableTrigger />
      } else {
        /**
         * @deprecated customTitle
         */
        const { title, customTitle, slots: columnSlots, ellipsis, sortable, filterable } = props.column as HeadColumn
        if (__DEV__ && customTitle) {
          Logger.warn('components/table', '`customTitle` is deprecated,  please use `title` in `slots` instead')
        }
        children = renderChildren(title, customTitle ?? columnSlots?.title, slots)
        _title = getColTitle(ellipsis, children!, title)

        const iconTriggers = renderTrigger(sortable, activeSortOrderBy, filterable, activeFilterBy, onUpdateFilterBy)

        if (iconTriggers.length > 0) {
          children = (
            <span class={`${prefixCls}-cell-triggers`}>
              <span class={`${prefixCls}-cell-title`}>{children}</span>
              {iconTriggers}
            </span>
          )
        } else if (ellipsis) {
          children = <span class={`${prefixCls}-cell-title`}>{children}</span>
        }
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const HeadColTag = headColTag.value as any
      return (
        <HeadColTag
          class={classes.value}
          style={style.value}
          colSpan={titleColSpan === 1 ? undefined : titleColSpan}
          rowSpan={titleRowSpan === 1 ? undefined : titleRowSpan}
          title={_title}
          {...additional}
          onClick={onClick}
        >
          {children}
        </HeadColTag>
      )
    }
  },
})

function renderChildren(
  title: string | undefined,
  customTitle: string | ((options: { title?: string }) => VNodeTypes) | undefined,
  slots: Slots,
) {
  let children: VNodeTypes | undefined = title
  if (isFunction(customTitle)) {
    children = customTitle({ title })
  } else if (isString(customTitle) && slots[customTitle]) {
    children = slots[customTitle]!({ title })
  }
  return children
}

function renderTrigger(
  sortable: TableColumnSortable | undefined,
  activeSortOrderBy: ComputedRef<'descend' | 'ascend' | undefined>,
  filterable: TableColumnFilterable | undefined,
  activeFilterBy: ComputedRef<VKey[]>,
  onUpdateFilterBy: (filterBy: VKey[]) => void,
) {
  const children = []
  sortable && children.push(<SortableTrigger activeOrderBy={activeSortOrderBy.value} sortable={sortable} />)
  if (filterable) {
    children.push(
      <FilterableTrigger
        activeFilterBy={activeFilterBy.value}
        filterable={filterable}
        onUpdateFilterBy={onUpdateFilterBy}
      />,
    )
  }
  return children
}
