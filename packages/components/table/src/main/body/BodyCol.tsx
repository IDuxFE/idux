import type { ComputedRef, Slots } from 'vue'
import type { TableBodyColProps } from '../../types'

import { computed, defineComponent, inject } from 'vue'
import { isFunction, isString } from 'lodash-es'
import { convertArray } from '@idux/cdk/utils'
import { tableToken } from '../../token'
import { tableBodyColProps } from '../../types'
import { getColTitle } from '../../utils'

export default defineComponent({
  props: tableBodyColProps,
  setup(props) {
    const { bodyColTag, slots } = inject(tableToken)!
    const classes = useClasses(props)
    const dataValue = useDataValue(props)

    return () => {
      const children = renderChildren(props, slots, dataValue)
      const { ellipsis, colSpan, rowSpan, additional } = props
      const mergedProps = {
        title: getColTitle(ellipsis, children, dataValue.value),
        colSpan: colSpan === 1 ? undefined : colSpan,
        rowSpan: rowSpan === 1 ? undefined : rowSpan,
        class: classes.value,
      }

      const BodyColTag = bodyColTag.value as any
      return (
        <BodyColTag {...mergedProps} {...additional}>
          {children}
        </BodyColTag>
      )
    }
  },
})

function useClasses(props: TableBodyColProps) {
  return computed(() => {
    const { align, ellipsis } = props
    const prefixCls = 'ix-table-td'
    return {
      [prefixCls]: true,
      [`${prefixCls}-align-${align}`]: true,
      [`${prefixCls}-ellipsis`]: ellipsis,
    }
  })
}

function useDataValue(props: TableBodyColProps) {
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

function renderChildren(props: TableBodyColProps, slots: Slots, dataValue: ComputedRef<any>) {
  let value = dataValue.value
  const { record, customRender, index } = props
  if (isFunction(customRender)) {
    return customRender({ value, record, index })
  } else if (isString(customRender) && slots[customRender]) {
    return slots[customRender]!({ value, record, index })
  }
  return value
}
