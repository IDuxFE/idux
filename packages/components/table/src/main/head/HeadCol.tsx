import type { Slots, VNodeTypes } from 'vue'
import type { TableHeadColProps } from '../../types'

import { computed, defineComponent, inject } from 'vue'
import { isFunction, isString } from 'lodash-es'
import { tableToken } from '../../token'
import { tableHeadColProps } from '../../types'
import { getColTitle } from '../../utils'

export default defineComponent({
  props: tableHeadColProps,
  setup(props) {
    const { headColTag, slots } = inject(tableToken)!

    const classes = useClasses(props)

    return () => {
      const { title, ellipsis, colSpan, rowSpan, additional } = props
      const children = renderChildren(props, slots)
      const mergedProps = {
        title: getColTitle(ellipsis, children!, title),
        colSpan: colSpan === 1 ? undefined : colSpan,
        rowSpan: rowSpan === 1 ? undefined : rowSpan,
        class: classes.value,
      }

      const HeadColTag = headColTag.value as any
      return (
        <HeadColTag {...mergedProps} {...additional}>
          {children}
        </HeadColTag>
      )
    }
  },
})

function useClasses(props: TableHeadColProps) {
  return computed(() => {
    const { align, ellipsis, hasChildren } = props
    const prefixCls = 'ix-table-th'
    return {
      [prefixCls]: true,
      [`${prefixCls}-align-${align}`]: !hasChildren,
      [`${prefixCls}-align-center`]: hasChildren,
      [`${prefixCls}-ellipsis`]: ellipsis,
    }
  })
}

function renderChildren(props: TableHeadColProps, slots: Slots) {
  const { title, customTitle } = props
  let children: VNodeTypes | undefined = title
  if (isFunction(customTitle)) {
    children = customTitle({ title })
  } else if (isString(customTitle) && slots[customTitle]) {
    children = slots[customTitle]!({ title })
  }

  return children
}
