import type { ComputedRef, Slots } from 'vue'
import type { TableBodyColExpandableProps } from '../../types'
import type { TableColumnMergedExpandable } from '../../composables/useColumns'

import { computed, defineComponent, inject } from 'vue'
import { isFunction, isString } from 'lodash-es'
import { IxIcon } from '@idux/components/icon'
import { tableToken } from '../../token'
import { tableBodyColExpandableProps } from '../../types'

export default defineComponent({
  props: tableBodyColExpandableProps,
  setup(props) {
    const { bodyColTag, slots, expandable } = inject(tableToken)!
    const classes = useClasses(props, expandable)
    return () => {
      const { colSpan, rowSpan, disabled } = props
      const mergedProps = {
        colSpan: colSpan === 1 ? undefined : colSpan,
        rowSpan: rowSpan === 1 ? undefined : rowSpan,
        class: classes.value,
      }
      const children = disabled ? null : renderChildren(props, slots, expandable)

      const BodyColTag = bodyColTag.value as any
      return (
        <BodyColTag {...mergedProps} {...expandable.value!.additional}>
          {children}
        </BodyColTag>
      )
    }
  },
})

function useClasses(
  props: TableBodyColExpandableProps,
  expandable: ComputedRef<TableColumnMergedExpandable | undefined>,
) {
  return computed(() => {
    const { align } = expandable.value!
    const { expanded } = props
    const prefixCls = 'ix-table'
    return {
      [`${prefixCls}-cell`]: true,
      [`${prefixCls}-align-${align}`]: true,
      [`${prefixCls}-expanded`]: expanded,
    }
  })
}

function renderChildren(
  props: TableBodyColExpandableProps,
  slots: Slots,
  expandable: ComputedRef<TableColumnMergedExpandable | undefined>,
) {
  const { icon, customIcon } = expandable.value!
  const { expanded, record, handleExpend } = props
  if (isFunction(customIcon)) {
    return customIcon({ expanded, record, onExpand: handleExpend })
  }
  if (isString(customIcon) && slots[customIcon]) {
    return slots[customIcon]!({ expanded, record, onExpand: handleExpend })
  }
  return <IxIcon name={icon[expanded ? 1 : 0]} rotate={expanded ? 180 : -180} onClick={handleExpend} />
}
