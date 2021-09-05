import type { ComputedRef, Slots, VNodeTypes } from 'vue'
import type { TableColumnMergedExpandable, TableColumnMergedSelectable } from '../../composables/useColumns'
import type { TableBodyCellProps } from '../../types'

import { computed, defineComponent, inject } from 'vue'
import { isFunction, isString } from 'lodash-es'
import { convertArray } from '@idux/cdk/utils'
import { IxCheckbox } from '@idux/components/checkbox'
import { IxIcon } from '@idux/components/icon'
import { IxRadio } from '@idux/components/radio'
import { tableToken } from '../../token'
import { tableBodyCellProps } from '../../types'
import { getColTitle } from '../../utils'

export default defineComponent({
  props: tableBodyCellProps,
  setup(props) {
    const { slots, expandable, selectable, bodyColTag } = inject(tableToken)!
    const dataValue = useDataValue(props)

    return () => {
      const { type, additional } = props
      let children: VNodeTypes | null
      let title: string | undefined
      if (type === 'expandable') {
        children = props.disabled ? null : renderExpandableChildren(props, slots, expandable)
      } else if (type === 'selectable') {
        children = renderSelectableChildren(props, selectable)
      } else {
        const text = dataValue.value
        children = renderChildren(props, slots, text)
        title = getColTitle(props.ellipsis, children, text)
      }

      const BodyColTag = bodyColTag.value as any
      return (
        <BodyColTag title={title} {...additional}>
          {children}
        </BodyColTag>
      )
    }
  },
})

function useDataValue(props: TableBodyCellProps) {
  return computed(() => {
    const { dataKey, record } = props
    const dataKeys = convertArray(dataKey)
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
  const { record, customRender, index } = props
  if (isFunction(customRender)) {
    return customRender({ value, record, index })
  } else if (isString(customRender) && slots[customRender]) {
    return slots[customRender]!({ value, record, index })
  }
  return value
}

function renderExpandableChildren(
  props: TableBodyCellProps,
  slots: Slots,
  expandable: ComputedRef<TableColumnMergedExpandable | undefined>,
) {
  const { icon, customIcon } = expandable.value!
  const record = props.record
  const expanded = props.expanded!
  const onExpand = props.handleExpend!
  if (isFunction(customIcon)) {
    return customIcon({ expanded, record, onExpand })
  }
  if (isString(customIcon) && slots[customIcon]) {
    return slots[customIcon]!({ expanded, record, onExpand })
  }
  return <IxIcon name={icon[expanded ? 1 : 0]} rotate={expanded ? 180 : -180} onClick={onExpand} />
}

function renderSelectableChildren(
  props: TableBodyCellProps,
  selectable: ComputedRef<TableColumnMergedSelectable | undefined>,
) {
  const { selected: checked, indeterminate, disabled, handleSelect: onChange } = props
  const { multiple } = selectable.value!
  if (multiple) {
    const checkboxProps = { checked, disabled, indeterminate, onChange }
    return <IxCheckbox {...checkboxProps}></IxCheckbox>
  } else {
    const radioProps = { checked, disabled, onChange }
    return <IxRadio {...radioProps}></IxRadio>
  }
}
