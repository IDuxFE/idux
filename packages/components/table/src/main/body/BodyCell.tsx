/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import {
  type CSSProperties,
  type ComputedRef,
  type Slots,
  type VNodeChild,
  computed,
  defineComponent,
  inject,
} from 'vue'

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
      mergedPrefixCls,
      slots,
      activeSortable,
      fixedColumnKeys,
      columnOffsets,
      isSticky,
      expandable,
      selectable,
      bodyColTag,
    } = inject(TABLE_TOKEN)!
    const dataValue = useDataValue(props)

    const cellProps = computed(() => {
      const { key, fixed, align, ellipsis } = props.column as BodyColumn
      const prefixCls = mergedPrefixCls.value
      let classes: Record<string, boolean> = {
        [`${prefixCls}-cell-sorted`]: activeSortable.key === key && !!activeSortable.orderBy,
        [`${prefixCls}-align-${align}`]: !!align,
        [`${prefixCls}-ellipsis`]: !!ellipsis,
      }

      let style: CSSProperties | undefined
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
        const { starts, ends } = columnOffsets.value
        const offsets = fixed === 'start' ? starts : ends
        const fixedOffset = convertCssPixel(offsets[props.colIndex])
        style = {
          position: 'sticky',
          left: fixed === 'start' ? fixedOffset : undefined,
          right: fixed === 'end' ? fixedOffset : undefined,
        }
      }
      return { class: classes, style }
    })

    const handleClick = (evt: Event) => {
      // see https://github.com/IDuxFE/idux/issues/547
      evt.stopPropagation()
    }

    return () => {
      const { type, additional } = props.column as BodyColumn
      let children: VNodeChild
      let title: string | undefined

      if (type === 'selectable') {
        children = renderSelectableChildren(props, selectable, handleClick)
      } else {
        const { ellipsis } = props.column
        const text = dataValue.value
        children = renderChildren(props, slots, dataValue.value)
        title = getColTitle(ellipsis, children, text)
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const BodyColTag = bodyColTag.value as any
      return (
        <BodyColTag {...cellProps.value} title={title} {...additional}>
          {type === 'expandable' && renderExpandableChildren(props, slots, expandable, mergedPrefixCls.value)}
          {children}
        </BodyColTag>
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
    Logger.warn('components/table', '`customRender` is deprecated,  please use `customCell` instead')
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
  const onExpand = props.handleExpend!
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
    <button class={`${prefixCls}-expandable-trigger`} style={style} onClick={onExpand}>
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
