import type { TableBodyColExpandProps } from '../../types'

import { computed, defineComponent, inject, Slots } from 'vue'
import { isFunction, isString } from 'lodash-es'
import { IxIcon } from '@idux/components/icon'
import { tableToken } from '../../token'
import { tableBodyColExpandProps } from '../../types'

export default defineComponent({
  props: tableBodyColExpandProps,
  setup(props) {
    const { bodyColTag, slots } = inject(tableToken)!
    const classes = useClasses(props)
    return () => {
      const { colSpan, rowSpan, additional } = props
      const mergedProps = {
        colSpan: colSpan === 1 ? undefined : colSpan,
        rowSpan: rowSpan === 1 ? undefined : rowSpan,
        class: classes.value,
      }

      const children = renderChildren(props, slots)

      const BodyColTag = bodyColTag.value as any
      return (
        <BodyColTag {...mergedProps} {...additional}>
          {children}
        </BodyColTag>
      )
    }
  },
})

function useClasses(props: TableBodyColExpandProps) {
  return computed(() => {
    const { align, expanded } = props
    const prefixCls = 'ix-table-td'
    return {
      [prefixCls]: true,
      [`${prefixCls}-align-${align}`]: true,
      [`${prefixCls}-expanded`]: expanded,
    }
  })
}

function renderChildren(props: TableBodyColExpandProps, slots: Slots) {
  const { expanded, record, icon, customIcon, handleExpend } = props
  const children = isFunction(customIcon) ? (
    customIcon({ expanded, record, onExpand: handleExpend })
  ) : isString(customIcon) ? (
    slots[customIcon]?.({ expanded, record, onExpand: handleExpend })
  ) : (
    <IxIcon name={icon[expanded ? 1 : 0]} rotate={expanded ? 180 : -180} onClick={handleExpend} />
  )
  return children
}
