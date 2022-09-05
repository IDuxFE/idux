/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { type ComputedRef, type Slots, type VNodeChild, computed, defineComponent, inject, normalizeClass } from 'vue'

import { isFunction, isString } from 'lodash-es'

import { Logger, convertArray, convertCssPixel } from '@idux/cdk/utils'
import { IxCheckbox } from '@idux/components/checkbox'
import { IxIcon } from '@idux/components/icon'
import { IxRadio } from '@idux/components/radio'

import {
  type TableColumnMergedExpandable,
  type TableColumnMergedExtra,
  type TableColumnMergedSelectable,
} from '../../composables/useColumns'
import { TABLE_TOKEN } from '../../token'
import { type TableBodyCellProps, tableBodyCellProps } from '../../types'
import { getColTitle } from '../../utils'

type BodyColumn = TableColumnMergedExtra & {
  type: 'selectable' | 'expandable' | undefined
}

export default defineComponent({
  props: tableBodyCellProps,
  setup(props) {
    const {
      props: tableProps,
      slots,
      mergedPrefixCls,
      activeOrderByMap,
      fixedColumnKeys,
      columnOffsets,
      isSticky,
      expandable,
      selectable,
    } = inject(TABLE_TOKEN)!
    const activeSortOrderBy = computed(() => activeOrderByMap[props.column.key])
    const dataValue = useDataValue(props)

    const isFixStartLast = computed(() => fixedColumnKeys.value.lastStartKey === props.column.key)
    const isFixEndFirst = computed(() => fixedColumnKeys.value.firstEndKey === props.column.key)

    const classes = computed(() => {
      const { fixed, align, ellipsis = tableProps.ellipsis } = props.column as BodyColumn
      const prefixCls = mergedPrefixCls.value
      let classes = {
        [`${prefixCls}-cell`]: true,
        [`${prefixCls}-cell-sorted`]: !!activeSortOrderBy.value,
        [`${prefixCls}-cell-align-${align}`]: !!align && align != 'start',
        [`${prefixCls}-cell-ellipsis`]: !!ellipsis,
      }
      if (fixed) {
        classes = {
          ...classes,
          [`${prefixCls}-fix-start`]: fixed === 'start',
          [`${prefixCls}-fix-start-last`]: isFixStartLast.value,
          [`${prefixCls}-fix-end`]: fixed === 'end',
          [`${prefixCls}-fix-end-first`]: isFixEndFirst.value,
          [`${prefixCls}-fix-sticky`]: isSticky.value,
        }
      }
      return normalizeClass(classes)
    })

    const style = computed(() => {
      const { fixed } = props.column as BodyColumn
      if (!fixed) {
        return
      }
      const { starts, ends } = columnOffsets.value
      const offsets = fixed === 'start' ? starts : ends
      const fixedOffset = convertCssPixel(offsets[props.colIndex])
      return {
        position: 'sticky',
        left: fixed === 'start' ? fixedOffset : undefined,
        right: fixed === 'end' ? fixedOffset : undefined,
      }
    })

    const handleClick = (evt: Event) => {
      // see https://github.com/IDuxFE/idux/issues/547
      evt.stopPropagation()
    }

    return () => {
      const { column } = props

      const { type, additional } = column as BodyColumn
      let children: VNodeChild
      let title: string | undefined

      if (type === 'selectable') {
        children = renderSelectableChildren(props, selectable, handleClick)
      } else {
        const { ellipsis = tableProps.ellipsis } = column
        const text = dataValue.value
        children = renderChildren(props, slots, dataValue.value)
        title = getColTitle(ellipsis, children, text)
      }

      // see: https://github.com/IDuxFE/idux/issues/1081
      const { fixed, ellipsis = tableProps.ellipsis } = props.column as BodyColumn
      if (fixed && ellipsis && (isFixStartLast.value || isFixEndFirst.value)) {
        children = <span class={`${mergedPrefixCls.value}-cell-content`}>{children}</span>
      }

      const customAdditionalFn = tableProps.customAdditional?.bodyCell
      const customAdditional = customAdditionalFn
        ? customAdditionalFn({ column, record: props.record, rowIndex: props.rowIndex })
        : undefined
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const Tag = (tableProps.customTag?.bodyCell ?? 'td') as any
      return (
        <Tag class={classes.value} style={style.value} title={title} {...additional} {...customAdditional}>
          {type === 'expandable' && renderExpandableChildren(props, slots, expandable, mergedPrefixCls.value)}
          {children}
        </Tag>
      )
    }
  },
})

function useDataValue(props: TableBodyCellProps) {
  return computed(() => {
    const { column, record } = props
    const dataKeys = convertArray(column.dataKey)
    if (dataKeys.length <= 0) {
      return undefined
    }

    let value = record
    for (let index = 0; index < dataKeys.length; index++) {
      if (!value) {
        break
      }
      const key = dataKeys[index]
      value = value[key]
    }

    return value
  })
}

function renderChildren(props: TableBodyCellProps, slots: Slots, value: string) {
  const { record, rowIndex, column } = props
  const { customRender, customCell } = column
  if (__DEV__ && customRender) {
    Logger.warn('components/table', '`customRender` was deprecated, please use `customCell` instead')
  }

  const cellRender = customRender ?? customCell
  if (isFunction(cellRender)) {
    return cellRender({ value, record, rowIndex })
  } else if (isString(cellRender) && slots[cellRender]) {
    return slots[cellRender]!({ value, record, rowIndex })
  }
  return value
}

function renderExpandableChildren(
  props: TableBodyCellProps,
  slots: Slots,
  expandable: ComputedRef<TableColumnMergedExpandable | undefined>,
  prefixCls: string,
) {
  const { icon, customIcon, indent } = expandable.value!
  const { record, expanded, level = 0, disabled } = props
  const style = {
    marginLeft: indent ? convertCssPixel(level * indent) : undefined,
  }

  let iconNode: VNodeChild | null
  if (disabled) {
    iconNode = null
  } else if (isFunction(customIcon)) {
    iconNode = customIcon({ expanded: !!expanded, record })
  } else if (isString(customIcon) && slots[customIcon]) {
    iconNode = slots[customIcon]!({ expanded, record })
  } else {
    iconNode = <IxIcon name={icon} rotate={expanded ? 90 : 0} />
  }

  return (
    <button class={`${prefixCls}-expandable-trigger`} style={style} type="button" onClick={props.handleExpend}>
      {iconNode}
    </button>
  )
}

function renderSelectableChildren(
  props: TableBodyCellProps,
  selectable: ComputedRef<TableColumnMergedSelectable | undefined>,
  onClick: (evt: Event) => void,
) {
  const { selected: checked, indeterminate, disabled, handleSelect: onChange } = props
  const { multiple } = selectable.value!
  if (multiple) {
    const checkboxProps = { checked, disabled, indeterminate, onChange, onClick }
    return <IxCheckbox {...checkboxProps}></IxCheckbox>
  } else {
    const radioProps = { checked, disabled, onChange, onClick }
    return <IxRadio {...radioProps}></IxRadio>
  }
}
